const Joi = require('joi')

const schema = (key) => Joi.object().keys({
  name: Joi.string().required(),
  price: Joi.number(),
  like: Joi.number(),
  desc: Joi.string(),
  about: Joi.string(),
  imgUrl: Joi.string(),
  teacherId: Joi.string().uuid()
})

module.exports = schema