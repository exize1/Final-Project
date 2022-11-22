const mongoose = require('mongoose')

const AssignmentSchema = mongoose.Schema({
    dogHandlerName: {
        type : String,
        required : false
    },
    dogHandlerID: {
        type : String,
        required : true
    },
    
    dateUpload: {
        type : String,
        required : true,
    },
    dateToEnd: {
        type : String,
        require: true
    },
    details: {
        type : String,
        required : true
    },
    complited: {
        type : Boolean,
        required : true
    },
    WhoComplited: {
        type : String,
        required : false
    },
    dogNumber: {
        type : String,
        required : true
    },
    
})

const Assignment = mongoose.model('newAssignment', AssignmentSchema)
module.exports = Assignment