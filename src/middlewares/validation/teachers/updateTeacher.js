const Joi = require('joi')

const schema = (key) => Joi.object().keys({
  id: Joi.string().uuid(),
  name: Joi.string(),
  surname: Joi.string(),
  experince: Joi.number(),
  subjects: Joi.string(),
  about: Joi.string(),
  imgUrl: Joi.string()
})

module.exports = schema