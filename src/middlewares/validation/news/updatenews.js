const Joi = require('joi')

const schema = (key) => Joi.object().keys({
  id: Joi.string().uuid().required(),
  imgUrl: Joi.string(),
  data: Joi.string(),
  view: Joi.number(),
  title: Joi.string(),
  desc: Joi.string()
})

module.exports = schema