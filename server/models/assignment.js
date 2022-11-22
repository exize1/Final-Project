const mongoose = require('mongoose')

const AssignmentSchema = mongoose.Schema({
    dogHandlerName: {
        type: String,
        required: true
    },
    dogHandlerID: {
        type: String,
        required: true
    },

    dateUpload: {
        type: String,
        required: true,
    },
    dateToEnd: {
        type: String,
        require: true
    },
    details: {
        type: String,
        required: true
    },
    complited: {
        type: Boolean,
        default: false
    },
    WhoComplited: {
        type: String,
    },
    dogNumber: {
        type: String,
        required: true
    },
    isNewAssignment: {
        type: Boolean,
        default: true
    }

})

const Assignment = mongoose.model('newAssignment', AssignmentSchema)
module.exports = Assignment