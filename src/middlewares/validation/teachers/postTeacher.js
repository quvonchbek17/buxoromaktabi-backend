const Joi = require('joi')

const schema = (key) => Joi.object().keys({
  name: Joi.string().required(),
  surname: Joi.string().required(),
  experince: Joi.number(),
  subjects: Joi.string(),
  about: Joi.string(),
  imgUrl: Joi.string()
})

module.exports = schema