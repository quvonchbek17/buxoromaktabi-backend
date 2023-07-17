const Joi = require('joi')

const schema = (key) => Joi.object().keys({
  fullname: Joi.required(),
  phone: Joi.string()
})

module.exports = schema