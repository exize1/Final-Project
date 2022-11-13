const mongoose = require('mongoose')

const UsersSchema = mongoose.Schema({
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

const Users = mongoose.model('newUsers', UsersSchema)
module.exports = Users