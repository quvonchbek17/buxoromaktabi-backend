const Joi = require('joi')

const schema = (key) => Joi.object().keys({
  id: Joi.string().uuid().required(),
  fullname: Joi.string(),
  year: Joi.number(),
  university: Joi.string(),
  points: Joi.number(),
  status: Joi.string()
})

module.exports = schema