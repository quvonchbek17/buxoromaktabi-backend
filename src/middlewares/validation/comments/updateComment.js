const Joi = require('joi')

const schema = (key) => Joi.object().keys({
  id: Joi.string().uuid().required() ,
  name: Joi.string(),
  desc: Joi.string(),
  imgUrl: Joi.string()
})

module.exports = schema