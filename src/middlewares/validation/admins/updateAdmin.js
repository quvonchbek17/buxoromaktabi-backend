const Joi = require('joi')

const schema = (key) => Joi.object().keys({
  adminName: Joi.string(),
  password: Joi.required()
})

module.exports = schema