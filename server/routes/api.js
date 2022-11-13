const express = require('express')
const router = express.Router()
const Dog = require('../models/dogs')
const Former = require('../models/formers')
const DogRequest = require('../models/dogRequests')

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




module.exports = router