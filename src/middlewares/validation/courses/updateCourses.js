const Joi = require('joi')

const schema = (key) => Joi.object().keys({
  id: Joi.string().uuid().required(),
  name: Joi.string(),
  price: Joi.number(),
  status: Joi.boolean(),
  like: Joi.number(),
  desc: Joi.string(),
  imgUrl: Joi.string(),
  teacherId: Joi.string().uuid()
})

module.exports = schema