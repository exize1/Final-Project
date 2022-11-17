const mongoose = require("mongoose")

const ReportSchema = mongoose.Schema({
   reporterDetails:{
      fullName:{
         type: String,
         required: true
        },

      email:{
         type: String,
         required: true
         },

      phone:{
         type: String,
         required: true
      },
          
     },

   dogDetails:{
         size:{
            type: String,
            required: true
         },
      
         color:{
            type: String,
            required: true
         },
      
         violent:{
            type: String,
            required: true
         },
   },

  
   location:{
      type: Object,
      required: true,
      default: {
        neighborhood: "",
        street: ""
      }
   },

   reportDetails:{
         details:{
            type: String,
            required: true
           },
        
         time:{
            type: Object,
            required: true
           },
        
         exstraDetails:{
            type: String           
         },
         picture:{
               type: Object,
               required:true
         },
      },
      
   status:{
    type: String,
    required: true,
    default: "reported"
   },

})
const Report = mongoose.model('report',ReportSchema)
module.exports = Report