const mongoose = require('mongoose')

const VolunteeringSchema = mongoose.Schema({
    titleName: {
        type : String,
        required : true
    },
    
    description: {
        type : String,
        required : true,
    },
    activityHours: {
        fromDayToDay:{
            type:Array,
            required:true,
        },
        fromHourToHour:{
            type:Array,
            required:true,
        }
    
    },

    contactNum:{
        type:String,
        required:false
    },
    
})

const Volunteering = mongoose.model('volunteering', VolunteeringSchema)
module.exports = Volunteering