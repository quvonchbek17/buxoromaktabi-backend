const Joi = require('joi')

const schema = (key) => Joi.object().keys({
  id: Joi.string().uuid().required()
})

module.exports = schema