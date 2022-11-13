const mongoose = require('mongoose')


const FormerSchema = mongoose.Schema({
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
    }
})

const Former = mongoose.model('former', FormerSchema)
module.exports = Former