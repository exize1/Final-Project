const Joi = require("joi");

const UserSchema = Joi.object().keys({
    firstName : Joi.string().required(),
    lastName : Joi.string().required(),
    email : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net']}}),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),
    phone: Joi.string()
})

module.exports= UserSchema;