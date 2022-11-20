const express = require('express')
const router = express.Router()
const Dog = require('../models/dogs')
const Former = require('../models/formers')
const DogRequest = require('../models/dogRequests')
const Users = require('../models/User')
const Assigmnent = require('../models/assignment')
const UsersPostValidation = require('../middelewares/validation');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const Event = require("../models/Event");
const handleError = require("../utils/eventErrors")
const Report = require('../models/reports')
const cloudinary = require('../utils/cloudinary')
const DogHandler = require('../models/DogHandler')
const Volunteering = require('../models/Volunteering')


router.get('/dogs/', ( req, res, next ) => {
    Dog.find({})
    .then((data) => res.json(data))
    .catch(next)
})

router.post('/dogs/', (req, res, next) =>{
    req.body.details.src && req.body.details.dogName  &&  req.body.details.gender  && req.body.details.age && req.body.details.size ?
    Dog.create(req.body)
        .then((data) => {
          res.json(data)
            // DogRequest.find( {size: data.size} )
            // .then((datas) => {
            //     datas.map(dog => {
            //         data.gender === dog.gender &&
            //         data.age === dog.age && res.json(dog) && console.log(dog)
            //     })
            // }).catch(next)
        })
        .catch(next) :
          res.json({error: 'this input is empty'})
})

router.delete('/dogs/:id', ( req, res, next ) => {
    Dog.findOneAndDelete({_id: req.params.id})
    .then((data) => res.json(data))
    .catch(next)
})

router.put('/dogs/:id', ( req, res, next ) => {
    const updates = {}
    if (req.body.forAdopting){
      updates.forAdopting = req.body.forAdopting
      updates.dates = req.body.dates
    }
    if (req.body.adopted) {
      updates.adopted = req.body.adopted
      updates.dates = req.body.dates
    }
    if (req.body.details){
      updates.details = req.body.details
    }

    if(req.body.treatments){
      updates.treatments = req.body.treatments
    }

    if(!req.body.display){
      updates.display = req.body.display
    }
    Dog.findOneAndUpdate({_id: req.params.id}, { $set: updates }, {new: true})
    .then((data) => res.json(data))
    .catch(next)
})


router.get('/dogRequests/', ( req, res, next ) => {
    DogRequest.find({})
    .then((data) => res.json(data))
    .catch(next)
})

router.post('/dogRequests/', (req, res, next) =>{
    req.body.fullName && req.body.email  && req.body.phone &&  req.body.gender  && req.body.age && req.body.size ?
    DogRequest.find( {size: req.body.size} )
    .then((datas) => {
        let isAlreadtRequested = false
        datas.map(dogReq => {
            if (req.body.gender === dogReq.gender &&
                req.body.age === dogReq.age &&
                req.body.email === dogReq.email &&
                req.body.phone === dogReq.phone ){

                isAlreadtRequested = true
            }
        })
        isAlreadtRequested ? res.json({
            error: true,
            message: 'נראה שהנתונים שלך כבר במערכת שלנו'
        }) 
        :                 
        DogRequest.create(req.body)
        .then((data) => {
            res.json(data)
        })
        .catch(next)
    }).catch(next)
    :
    res.json({
        error: true,
        message: 'כל השדות חייבים להיות מלאים'
    })
})

router.delete('/dogRequests/', ( req, res, next ) => {
    DogRequest.find({})
    .then((data) => data.map((dog) => {
        DogRequest.findOneAndDelete({_id: dog._id})
        .then(console.log("deleted"))
    }))
    .catch(next)
})

router.post('/login', async function (req, res, next) {
    const { email, password } = req.body
  
    const user = await DogHandler.findOne({ email })
    if (user) {
      const result = await bcrypt.compare(password, user.password)
      if (result) {
        const accessToken = generateAccessToken(user)
        // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
        console.log(user);
        res.json({
          "error": false,
          "message": "התחבר בהצלחה",
          userData: user,
          accessToken: accessToken
        })
      } else {
        res.json({
          "error": true,
          "message": "אימייל או סיסמה לא נכונים"
        })
      }
    } else return res.json({
      "error": true,
      "message": "אימייל או סיסמה לא נכונים"
    })
});
  
  function generateAccessToken(user) {
    return jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET)
    // return jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
  }

  router.post('/registerDogHandler', UsersPostValidation, async function (req, res, next) {
    const { email, firstName, lastName, phone } = req.body
    let { password } = req.body
    const userExist = await DogHandler.findOne({ email })
  
    if (!userExist) {
      password = await bcrypt.hash(password, 10)
      const user = {
        firstName,
        lastName,
        password,
        email,
        phone
      }
      DogHandler.create(user).then(async(newUser) => {
        const accessToken = generateAccessToken(newUser)
        res.json(
          {
          "error": false,
          "message": "user registered successfully",
          userData: newUser,
          accessToken: accessToken
        })
      }).catch(err => {
        res.json({
          "error": true,
          "message": `couldn't register user ${err}`,
          "err": err
        })
      })
    } else {
      res.json({
        "error": true,
        "message": "user already registered"
      })
    }
  })

  ////////////////calendar
  router.get("/events/calendar", async(req, res)=>{

    const events = await Event.find({});
 
    try{
       
       res.status(200).json(events)

      
    }catch(err){
        handleError(err, res)
    }
});

router.get("/events/calendar/:id/show", async(req, res)=>{
    const id =   req.params.id
    const event = await Event.findById(id);
 
    try{
       res.status(200).json(event)

      
    }catch(err){
        handleError(err, res)
    }
});

router.post("/events/calendar", async(req, res)=>{
   
        const newEvent = await new Event(req.body)
     
        try{
           await newEvent.save((err, event)=>{
                if(err){
                    handleError(err, res)
                }else{
                    res.status(200).json(event)
                }
            })
        }catch(err){
            handleError(err, res)
        }
    }
)

router.put("/events/calendar/:id/update", async (req, res)=>{
    const id = req.params.id
     try{
        const event = await Event.findOne({_id : id})
        if(event){
            Object.assign(event, req.body);
             event.save((err, event)=>{
                if(err){
                    handleError(err, res)
                }else{
                    res.status(200).json(event)
                }
        })
    }   
        if(!event){
            res.status(404).json({error: "event is not found"})
        }
     }catch (err){
       console.log(err)
       handleError(err,res)
     }
 



//   const result = await Event.findOneAndUpdate(req.params.id,
//         {
//         $set: req.body,
//     }
//     , {new: true, runValidators: true}).clone()

//     try{
//         res.status(200).json(result)
//     }catch(err){
//         // res.status(500).json(Object.keys(result.errors)[0])
//         console.log(err)
//         res.status(400).json(err)
//     }
    // .then((docs, err)=>{
    //     if(docs){
    //         res.status(200).json(docs)
    //     }else{
    //         console.log(err.errors.path)
    //         handleError(err, res)
    //     }
    // })
})

router.delete("/events/calendar/:id/delete", async(req, res)=>{
    const id = req.params.id;
    try{
        await Event.findByIdAndRemove(id)
        res.status(200).json("Event has been deleted");
    }catch(err){
        handleError(err, res)
    }

})
////////////////////////////
router.get('/reports',(req,res,next)=>{
  Report.find({})
  .then((data) => res.json(data))
  .catch(next)
}) 


router.post('/reports', async (req,res,next) => {

  const { reporterDetails, dogDetails, location, reportDetails} = req.body;

    const result = await cloudinary.uploader.upload(req.body.reportDetails.picture);
    if (result) {
      reportDetails.picture = result
      const report = {
        reporterDetails,
        dogDetails,
        location,
        reportDetails,
        // picture: result,
      } 
      Report.create(report)
      .then(() =>{ 
        res.json({
          "error" : false,
          "message": "הדיווח נשלח בהצלחה"
        })
      }).catch(err =>{
        res.json({
          "error" : true,
          "message": "לא היה ניתן לשלוח את הדיווח",
          "m":err

        })
      })
    }else{
      res.json({ error: `this input is empty -> ${req.body}` })
    }
   
})

router.put('/reports/:id',(req,res,next)=>{
  const id = req.params.id
  const updates = {}
  const status = req.body.status
  if(status) updates.status = req.body.status

    Report.findOneAndUpdate({_id: id }, { $set: updates }, { new: true })
      .then((data) => res.json(data))
      .catch(next)
  })


router.delete('/reports/:id', ( req,res,next) => {
    console.log("delete");
    Report.findOneAndDelete({_id: req.params.id })
        .then((data) => res.json(data))
        .catch(next)
})


router.patch('/animals/:id',(req,res,next)=>{
  const id = req.params.id
  const status = req.body.status
  animal= Report.findOne({_id:id })
  .then((data) =>{
    Report.findOneAndUpdate({_id:id }, {status:status},{ returnDocument: 'after' },function(err, doc){
        res.json(data)
        if(err){
            console.log("Something wrong when updating data!");
          }
          console.log(doc);
        })
      
  }
  )
  .catch(next)
})

router.delete('/animals/:id', ( req,res,next) => {
    console.log("delete");
    Report.findOneAndDelete({_id: req.params.id })
        .then((data) => res.json(data))
        .catch(next)
})

///////////assigmnents

router.get('/assigmnents',(req,res,next)=>{
  Assigmnent.find({})
  .then((data) => res.json(data))
  .catch(next)
}) 

router.delete("/assigmnents/:id", async(req, res)=>{
  const id = req.params.id;
  try{
      await Assigmnent.findByIdAndRemove(id)
      res.status(200).json("Assigmnent has been deleted");
  }catch(err){
      handleError(err, res)
  }

})

router.post('/assigmnents', async (req,res,next) => {

  const { dogHandlerName, dateUpload, dateToEnd, details,complited,dogNumber} = req.body;

      const report = {
        dogHandlerName,
        dateUpload,
        dateToEnd,
        details,
        complited,
        dogNumber
      } 
      Assigmnent.create(report)
      .then(() =>{ 
        res.json({
          "error" : false,
          "message": "המשימה נשלחה בהצלחה"
        })
      }).catch(err =>{
        res.json({
          "error" : true,
          "message": "לא היה ניתן לשלוח את המשימה",
          "m":err

        })
      })
    
   
})

router.patch('/assigmnents/:id',(req,res,next)=>{
  const id = req.params.id
  const status = req.body.status
  assigmnents= Report.findOne({_id:id })
  .then((data) =>{
    Assigmnent.findOneAndUpdate({_id:id }, {complited:status},{ returnDocument: 'after' },function(err, doc){
        res.json(data)
        if(err){
            console.log("Something wrong when updating data!");
          }
          console.log(doc);
        })
      
  }
  )
  .catch(next)
})

router.get('/volunteering',(req,res,next)=>{
  Volunteering.find({})
  .then((data) => res.json(data))
  .catch(next)
}) 

router.post('/volunteering', async (req,res,next) => {

  const {  titleName, description, activityHours, contactNum} = req.body;

      const addVolunteering = {
        titleName, 
        description, 
        activityHours,
        contactNum,
      } 
      Volunteering.create(addVolunteering)
      .then(() =>{ 
        res.json({
          "error" : false,
          "message": "ההתנדבות התקבלה בהצלחה"
        })
      }).catch(err =>{
        res.json({
          "error" : true,
          "message": "לא היה ניתן לשלוח את ההתנדבות",
          "m":err

        })
      })
    })
    router.delete('/volunteering/:id', ( req,res,next) => {
      console.log("delete");
      Volunteering.findOneAndDelete({_id: req.params.id })
          .then((data) => res.json(data))
          .catch(next)
  })

  router.put('/volunteering/:id',(req,res,next)=>{
    const id = req.params.id
    const updates = {}
    const status = req.body.status
    if(status) updates.status = req.body.status
  
      Volunteering.findOneAndUpdate({_id: id }, { $set: updates }, { new: true })
        .then((data) => res.json(data))
        .catch(next)
    })


module.exports = router