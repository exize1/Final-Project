const mongoose = require('mongoose')


const DogRequestSchema = mongoose.Schema({
    fullName: {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true
    },
    phone: {
        type : String,
        required : true
    },
    isInDB: {
        type : Boolean,
        default : true
    },
    dogId: {
        type : String,
    },
    details: {
        gender: {
            type : String,
            required : true 
        }, 
        age: {
            type : String,
            required : true
        }, 
        size: {
            type : String,
            required : true
        }, 
    },
    addedMessage: {
        type : String,
    },
    dates: {
        type : Object,
        required : true
    },
    newReq:{
        type : Boolean,
        default : true
    }
})

const DogRequest = mongoose.model('dogRequest', DogRequestSchema)
module.exports = DogRequest