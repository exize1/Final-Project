const mongoose= require("mongoose")

const AnimalSchema=mongoose.Schema({
   place:{
    type:String,
    required:true
   },
   size:{
    type:String,
    required:true
   },
   color:{
    type:String,
    required:true
   },
   vailent:{
    type:String,
    required:true
   },
   problem:{
    type:String,
    required:true
   },
   time:{
    type:String,
    required:true
   },
   exstraDetails:{
    type:String,
    required:true
   },
//    photo:{
//     type: String,
//     required:true
// },

   type:{
    type:String,
    required:true
},
   phoneNumber:{
    type:String,
    required:true
   },
   email:{
    type:String,
    required:true
   },
   name:{
    type:String,
    required:true
   },
   status:{
    type:String,
    required:true
   },

})
const Animal=mongoose.model('animal',AnimalSchema)
module.exports=Animal