const express = require('express')
const router = express.Router()
const Dog = require('../models/dogs')
const DogRequest = require('../models/dogRequests')
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

router.get('/dogs/', (req, res, next) => {
  Dog.find({})
    .then((data) => res.json(data))
    .catch(next)
})

router.post('/dogs/', async (req, res, next) => {
  const { details, treatments, dates } = req.body;
  let result = null
  if (req.body.details.src){
    result = await cloudinary.uploader.upload(req.body.details.src);
  }
    if (result) {
      details.src = result
      const dog = {
        details,
        treatments,
        dates,
      }
      Dog.create(dog)
        .then((data) => {
          DogRequest.find( {isInDB: false} )
          .then((datas) => {
              datas.map(dogReq => {
                  data.details.size === dogReq.details.size &&
                  data.details.gender === dogReq.details.gender && 
                  data.details.age === dogReq.details.age && console.log(dogReq);


              })
          }).catch(next)
          res.json({
            "error": true,
            "message": "תיק כלב נוצר בהצלחה",
            "alertType": "success"
          })
        }).catch(err => {
          res.json({
            "error": true,
            "message": "לא כל השדות מלאים",
            "alertType": "danger",
            "err": err
          })
        })
    } else {
      res.json({
        "error": true,
        "message": "אנא הכניסו קובץ תמונה",
        "alertType": "danger",
      })
    }
})

router.delete('/dogs/:id', (req, res, next) => {
  Dog.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next)
})
router.delete('/dogs', (req, res, next) => {
  Dog.find({})
    .then((data) =>{
      for (let i = 11; i < data.length; i++) {
        Dog.findOneAndDelete({ _id: data[i]._id })
    .then((data) => res.json(data))
    .catch(next)
        
      }
      
    })
    .catch(next)
  
})
router.put('/dogs/:id', (req, res, next) => {
  const updates = {}
  if (req.body.forAdopting) {
    updates.forAdopting = req.body.forAdopting
    updates.dates = req.body.dates
  }else if(req.body.removeFromAdoption){
    updates.forAdopting = req.body.forAdopting
    updates.dates = req.body.dates
  }
  if (req.body.adopted) {
    updates.adopted = req.body.adopted
    updates.dates = req.body.dates
  }
  if (req.body.details) {
    updates.details = req.body.details
  }

  if (req.body.treatments) {
    updates.treatments = req.body.treatments
  }

  if (!req.body.display) {
    updates.display = req.body.display
  }
  Dog.findOneAndUpdate({ _id: req.params.id }, { $set: updates }, { new: true })
  .then((data) =>{
    res.json({
      "error": true,
      "alertType": "success",
      "message": " עודכן בהצלחה"
    })
  }).catch(err => {
    res.json({
      "error": true,
      "alertType": "danger",
      "message": "לא היה ניתן לשלוח את העדכון",
      "m": err

    })
  })
})


router.get('/dogRequests/', (req, res, next) => {
  DogRequest.find({})
    .then((data) => res.json(data))
    .catch(next)
})

router.post('/dogRequests/', (req, res, next) => {

  req.body.fullName && req.body.email && req.body.phone && req.body.details.gender && req.body.details.age && req.body.details.size ?
    DogRequest.find({ isInDB: false })
      .then((datas) => {
        let isAlreadtRequested = false
        datas.map(dogReq => {
          if (req.body.details.gender === dogReq.details.gender &&
            req.body.details.age === dogReq.details.age &&
            req.body.details.size === dogReq.details.size &&
            req.body.email === dogReq.email &&
            req.body.phone === dogReq.phone) {
            isAlreadtRequested = true
          }
        })
        isAlreadtRequested ?
          res.json({
            error: true,
            message: 'נראה שהנתונים שלך כבר במערכת שלנו'
          }) :
          DogRequest.create(req.body)
            .then((data) => {
              res.json(data)
            })
            .catch(err => res.json(err))

      }).catch(next)
    :
    res.json({
      error: true,
      message: 'כל השדות חייבים להיות מלאים'
    })
})

router.put('/dogRequests/:id', (req, res, next) => {
  const updates = req.body
  DogRequest.find({ dogId: req.params.id })
    .then((data) => {
      data.map(dogReq => {
        console.log(updates)
        console.log(dogReq)
        DogRequest.findOneAndUpdate({ _id: dogReq._id }, { $set: updates }, { new: true })
          .then((data) => console.log(data))
          .catch(next)
      })
      res.json(data)
    }
    )
})

router.delete('/dogRequests/', (req, res, next) => {
  DogRequest.find({})
    .then((data) => data.map((dog) => {
      DogRequest.findOneAndDelete({ _id: dog._id })
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
}
router.get('/users', (req, res, next) => {
  DogHandler.find({})
    .then((data) => res.json(data))
    .catch(next)
})

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
      phone,
      role: "regular"
    }
    DogHandler.create(user).then(async (newUser) => {
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
router.get("/events/calendar", async (req, res) => {

  const events = await Event.find({});

  try {

    res.status(200).json(events)


  } catch (err) {
    handleError(err, res)
  }
});

router.get("/events/calendar/:id/show", async (req, res) => {
  const id = req.params.id
  const event = await Event.findById(id);

  try {
    res.status(200).json(event)


  } catch (err) {
    handleError(err, res)
  }
});

router.post("/events/calendar", async (req, res) => {
  console.log(req.body);
  const newEvent = await new Event(req.body)
  
  try {
    await newEvent.save((err, event) => {
      if (err) {
        handleError(err, res)
      } else {
        res.status(200).json({
          "error": true,
          "alertType": "success",
          "message": " נוסף בהצלחה"
        })
      }
    })
  } catch (err) {
    res.json({
      "error": true,
      "alertType": "danger",
      "message": "לא היה ניתן להוסיף את האירוע",
      "m": err

    })
    handleError(err, res)
  }
}
)

router.put("/events/calendar/:id/update", async (req, res) => {
  const id = req.params.id
  try {
    const event = await Event.findOne({ _id: id })
    if (event) {
      Object.assign(event, req.body);
      event.save((err, event) => {
        if (err) {
          handleError(err, res)
        } else {
          res.status(200).json(event)
        }
      })
    }
    if (!event) {
      res.status(404).json({ error: "event is not found" })
    }
  } catch (err) {
    console.log(err)
    handleError(err, res)
  }
})

router.delete("/events/calendar/:id/delete", async (req, res) => {
  const id = req.params.id;
  try {
    await Event.findByIdAndRemove(id)
    res.status(200).json("Event has been deleted");
  } catch (err) {
    handleError(err, res)
  }

})
////////////////////////////
router.get('/reports', (req, res, next) => {
  Report.find({})
    .then((data) => res.json(data))
    .catch(next)
})


router.post('/reports', async (req, res, next) => {

  const { reporterDetails, dogDetails, location, reportDetails } = req.body;
  let result = null
  if (req.body.reportDetails.picture){
    result = await cloudinary.uploader.upload(req.body.reportDetails.picture);
  }
  if (result) {
  reportDetails.picture = result
  const report = {
    reporterDetails,
    dogDetails,
    location,
    reportDetails,
    picture: result,
  }
  if (req.body.lost) report.lost = req.body.lost
  Report.create(report)
    .then(() => {
      res.json({
        "error": true,
        "message": "הדיווח נשלח בהצלחה",
        "alertType": "success"
      })

    }).catch(err => {
      res.json({
        "error": true,
        "message": "לא היה ניתן לשלוח את הדיווח",
        "alertType": "danger",
        "m": err

      })
    })
  } else {
    res.json({ error: `this input is empty -> ${req.body}` })
  }

})

router.put('/reports/:id', (req, res, next) => {
  const id = req.params.id
  const updates = {}
  const status = req.body.status
  if (status) updates.status = req.body.status

  Report.findOneAndUpdate({ _id: id }, { $set: updates }, { new: true })
  .then((data) => {
    res.json({
      "error": true,
      "alertType": "success",
      "message": "הסטטוס התעדכן בהצלחה"
    })
  })
  .catch((err)=>{
    res.json({
      "error": true,
    "alertType": "danger",
    "message": "לא היה ניתן לשלוח את הסטטוס החדש",
    "m": err
  })
  })
})


router.delete('/reports/:id', (req, res, next) => {
  console.log("delete");
  Report.findOneAndDelete({ _id: req.params.id })
  .then((data) => {
    res.json({
      "error": true,
      "alertType": "success",
      "message": "הדיווח נמחק בהצלחה"
    })
  })
  .catch((err)=>{
    res.json({
      "error": true,
    "alertType": "danger",
    "message": "לא היה ניתן למחוק את הדיווח",
    "m": err
  })
  })
})

router.delete('/reports/', ( req,res,next) => {
    console.log("delete");
    Report.find({})
        .then((data) => data.map( report => {
          Report.findOneAndDelete({_id: report._id})
          .then(data => console.log("delete"))
        }))
        .catch(next)
})

///////////assigmnents

router.get('/assigmnents', (req, res, next) => {
  Assigmnent.find({})
    .then((data) => res.json(data))
    .catch(next)
})

router.delete("/assigmnents/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Assigmnent.findByIdAndRemove(id)
    res.status(200).json("Assigmnent has been deleted");
  } catch (err) {
    handleError(err, res)
  }

})

router.post('/assigmnents', async (req,res,next) => {

  const { dogHandlerID, dateUpload, dateToEnd, details,complited,dogNumber} = req.body;
  dogHandlerID ? await DogHandler.findOne({_id: dogHandlerID})
      .then((data)=>{
        const dogHandlerName = data.firstName
      const report = {
        dogHandlerName,
        dogHandlerID,
        dateUpload,
        dateToEnd,
        details,
        complited,
        dogNumber,
        WhoComplited:""

      } 
      
      Assigmnent.create(report)
      .then(() =>{ 
        res.json({
          "error": true,
          "alertType": "success",
          "message": "המשימה נוספה בהצלחה"
        })
        console.log(report);
      }).catch(err =>{
        res.json({
          "error": true,
          "alertType": "danger",
          "message": "לא כל השדות מלאים",
          "m": err
      })
    })
  }):        
  res.json({
    "error": true,
    "alertType": "danger",
    "message": "נא להכניס שם כלבן",
})
})

router.put('/oldassigmnents/:id', (req, res, next) => {
  const id = req.params.id
  Assigmnent.find({ dogHandlerID: id })
  .then( data => {
    data.map(assignment => {
      Assigmnent.findOneAndUpdate({ _id: assignment._id }, { $set: {isNewAssignment: false} }, { new: true })
        .then((data) => console.log(data))
        .catch(next)
    })
    res.json("done")
  })
})


router.put('/assigmnents/:id', (req, res, next) => {
  const id = req.params.id
  const status = req.body.status
  const WhoComplited = req.body.WhoComplited
  Report.findOne({ _id: id })
    .then((data) => {
      Assigmnent.findOneAndUpdate({ _id: id }, { $set: {complited: status, WhoComplited: WhoComplited} }, { returnDocument: 'after' }, function (err, doc) {
        res.json(data)
        if (err) {
          console.log("Something wrong when updating data!");
        }
        console.log(doc);
      })

    }
    )
    .catch(next)
})
//////delete all assignment 
router.delete('/assigmnents', ( req,res,next) => {
  console.log("delete");
  Assigmnent.find({})
      .then((data) => data.map( assigmnent => {
        Assigmnent.findOneAndDelete({_id: assigmnent._id})
        .then(data => console.log("delete"))
      }))
      .catch(next)
})



router.get('/volunteering', (req, res, next) => {
  Volunteering.find({})
    .then((data) => res.json(data))
    .catch(next)
})

router.post('/volunteering', async (req, res, next) => {

  const { titleName, description, activityHours, contactNum } = req.body;

  const addVolunteering = {
    titleName,
    description,
    activityHours,
    contactNum,
  }
  Volunteering.create(addVolunteering)
    .then(() => {
      res.json({
        "error": true,
        "alertType": "success",
        "message": "ההתנדבות התקבלה בהצלחה"
      })
    }).catch(err => {
      res.json({
        "error": true,
        "alertType": "danger",
        "message": "לא היה ניתן לשלוח את ההתנדבות",
        "m": err

      })
    })
})
router.delete('/volunteering/:id', (req, res, next) => {
  console.log("delete");
  Volunteering.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next)
})

router.put('/volunteering/:id', (req, res, next) => {
  const id = req.params.id
  const updates = {}
  const status = req.body.status
  if (status) updates.status = req.body.status

  Volunteering.findOneAndUpdate({ _id: id }, { $set: updates }, { new: true })
    .then((data) => res.json(data))
    .catch(next)
})


module.exports = router