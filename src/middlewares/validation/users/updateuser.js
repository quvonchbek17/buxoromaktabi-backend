const Joi = require('joi')

const schema = (key) => Joi.object().keys({
  id: Joi.required(),
  fullname: Joi.string(),
  status: Joi.boolean(),
  phone: Joi.string()
})

module.exports = schema