const Joi=require('@hapi/joi') //validation lib


function registerValidation(data) {
    //Validation
    const schema={
        name:Joi.string()
            .min(6)
            .required(),
        email:Joi.string()
            .min(6)
            .required()
            .email(),
        password:Joi.string()
            .min(6)
            .required()
    }
    return Joi.validate(data, schema)
}

function loginValidation(data) {
    //Validation
    const schema={
        email:Joi.string()
            .min(6)
            .required()
            .email(),
        password:Joi.string()
            .min(6)
            .required()
    }
    return Joi.validate(data, schema)
}

module.exports.loginValidation=loginValidation;
module.exports.registerValidation=registerValidation;
