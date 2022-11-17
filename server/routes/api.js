const express = require('express')
const router = express.Router()
const Dog = require('../models/dogs')
const Former = require('../models/formers')
const DogRequest = require('../models/dogRequests')
const Users = require('../models/User')
const UsersPostValidation = require('../middelewares/validation');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const Event = require("../models/Event");
const handleError = require("../utils/eventErrors")
const Animal=require('../models/animal')
const cloudinary = require('../utils/cloudinary')


router.get('/dogs/', ( req, res, next ) => {
    Dog.find({})
    .then((data) => res.json(data))
    .catch(next)
})

router.post('/dogs/', (req, res, next) =>{
    req.body.src && req.body.dogName  && req.body.shortDescription  && req.body.gender  && req.body.age && req.body.size ?
    Dog.create(req.body)
        .then((data) => {
            DogRequest.find( {size: data.size} )
            .then((datas) => {
                datas.map(dog => {
                    data.gender === dog.gender &&
                    data.age === dog.age && res.json(dog) && console.log(dog)
                })
            }).catch(next)
        })
        .catch(next) :
        res.json({error: 'this input is empty'})
})

router.delete('/dogs/:id', ( req, res, next ) => {
    Dog.findOneAndDelete({_id: req.params.id})
    .then((data) => res.json(data))
    .catch(next)
})

router.patch('/dogs/:id', ( req, res, next ) => {
    Dog.findOneAndUpdate({_id: req.params.id})
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
  
    const user = await Users.findOne({ email })
    if (user) {
      const result = await bcrypt.compare(password, user.password)
      console.log(user);
      if (result) {
        const accessToken = generateAccessToken(user)
        // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
  
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

  router.post('/registerInspector', UsersPostValidation, async function (req, res, next) {
    const { email, firstName, lastName, avatar, phone } = req.body
    let { password } = req.body
    const userExist = await Users.findOne({ email })
  
    if (!userExist) {
      password = await bcrypt.hash(password, 10)
      const user = {
        firstName,
        lastName,
        password,
        email,
        phone
      }
      Users.create(user).then(async(newUser) => {
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
router.get('/animals',(req,res,next)=>{
  Animal.find({},["place",'size','color','vailent','problem','time','exstraDetails','photo','type','phoneNumber','email','name','status'])
  .then((data) => res.json(data))
  .catch(next)
}) 


router.post('/animal',async  (req,res,next)=>{


  const { place, size, color, vailent, 
    problem, time, exstraDetails, type, phoneNumber,email,name,status} = req.body;
    
    // const result = await cloudinary.uploader.upload(req.body.photo);
    // if (result) {
      const animal = {
        place,
        size,
        color,
        vailent,
        problem,
        time,
        exstraDetails,
        type,
        phoneNumber,
        // photo: result,
        email,
        name,
        status
      } 
    Animal.create(animal)
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
    // }else{
    //   res.json({ error: `this input is empty -> ${req.body}` })
    // }
   
})

router.patch('/animals/:id',(req,res,next)=>{
  const id = req.params.id
  const status = req.body.status
  animal= Animal.findOne({_id:id })
  .then((data) =>{
      Animal.findOneAndUpdate({_id:id }, {status:status},{ returnDocument: 'after' },function(err, doc){
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
    Animal.findOneAndDelete({_id: req.params.id })
        .then((data) => res.json(data))
        .catch(next)
})
router.post('/animal',async  (req,res,next)=>{


  const { place, size, color, vailent, 
    problem, time, exstraDetails, type, phoneNumber,email,name} = req.body;

    const result = await cloudinary.uploader.upload(req.body.photo);
    if (result) {
      const animal = {
        place,
        size,
        color,
        vailent,
        problem,
        time,
        exstraDetails,
        type,
        phoneNumber,
        photo: result,
        email,
        name
      } 
    Animal.create(animal)
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

router.patch('/animals/:id',(req,res,next)=>{
  const id = req.params.id
  const status = req.body.status
  animal= Animal.findOne({_id:id })
  .then((data) =>{
      Animal.findOneAndUpdate({_id:id }, {status:status},{ returnDocument: 'after' },function(err, doc){
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
    Animal.findOneAndDelete({_id: req.params.id })
        .then((data) => res.json(data))
        .catch(next)
})
module.exports = router