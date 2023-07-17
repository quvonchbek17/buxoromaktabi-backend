const {verify} = require("jsonwebtoken")
const model = require("./model")

  const protect = async (req, res, next) => {
    try {

      let authToken = ""

      const token = req.headers.authorization

      if (token && token.startsWith("BMToken ")) {
        authToken = token.split(" ")[1];
      }
      if (!authToken){
        res.status(401).json({
          success: false,
          message: "Foydalanish uchun tizimga kiring !"
        })
      }

      const decodedToken = verify(authToken, process.env.SECRET_KEY);

      if (!decodedToken){
        res.status(400).json({
          success: false,
          message: "Token o'zgartirilgan !"
        })
      }

      const user = await model.adminById(decodedToken)

      if (!user){
        res.status(404).json({
          success: false,
          message: "Admin topilmadi !"
        })
      }

      req.user = user[0];

      next()

    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Tokenda muammo yoki xatolik, Iltimos tokenni yangilang yoki tizimga qaytadan kiring !!!"
      })
      return
    }
  }

  module.exports = protect