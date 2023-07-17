const Joi = require('joi')

const schema = (key) => Joi.object().keys({
  name: Joi.string().required(),
  desc: Joi.string().required(),
  imgUrl: Joi.string(),
})

module.exports = schema