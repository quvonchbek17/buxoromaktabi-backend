const Joi = require('joi')

const schema = (key) => Joi.object().keys({
  adminName: Joi.required(),
  password: Joi.required(),
})

module.exports = schema