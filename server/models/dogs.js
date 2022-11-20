const mongoose = require('mongoose')


const DogSchema = mongoose.Schema({
    details: {
        src: {
            type : String,
            required : true
        },
        dogName: {
            type : String,
            required : true
        },
        description: {
            type : String,
            required : true
        },
        chipNumber: {
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
        weight: {
            type : String,
            required : true
        },
        size: {
            type : String,
            required : true
        },
    },

    adopted: {
        type : Boolean,
        required : true,
        default : false
    },

    forAdopting: {
        type : Boolean,
        required : true,
        default : false
    },

    treatments: {
        type : Array,
    },

    dates: {
        initialDate: {
            type : Object,
            required : true
        },
        addForAdoptingDate: {
            type : Object,
        },
        AdoptedDate: {
            type : Object,
        }
    },

    display: {
        type : Boolean,
        required : true,
        default : true
    },

})

const Dog = mongoose.model('dog', DogSchema)
module.exports = Dog