const mongoose = require('mongoose')

const DogHandlerSchema = mongoose.Schema({
    firstName: {
        type : String,
        required : true
    },
    lastName: {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true,
        unique: true
    },
    phone: {
        type : String,
        require: true
    },
    password: {
        type : String,
        required : true
    },
    loggedIn: {
        type: Boolean,
        default: false
    }
})

const DogHandler = mongoose.model('newDogHandler', DogHandlerSchema)
module.exports = DogHandler