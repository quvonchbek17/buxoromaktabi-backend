const { generateHash, compareHash } = require("../../utils/bcrypt");
const { sign, verify } = require("../../utils/jwt");
const { v4 } = require("uuid");
const model = require("./model");

module.exports = class UsersController {
  static async Login(req, res, next) {
    try {
      const { adminName, password } = req.body;
      const admin = await model.selectedAdmin(adminName, password);

      const remoteIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
      const device = req.headers["user-agent"];
      model.postSession(admin[0]?.admin_id, adminName, password, remoteIp, device)

      if (admin.length > 0) {
        let Token = sign(admin[0].admin_id);
        res.status(200).json({
          success: true,
          message: "Muvaffaqiyatli kirildi !",
          data: admin[0],
          token: Token,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Login yoki parol xato kiritildi !",
        });
      }
    } catch (error) {
      next(error);
    }
  }
};
