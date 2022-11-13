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
})

const DogRequest = mongoose.model('dogRequest', DogRequestSchema)
module.exports = DogRequest