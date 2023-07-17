const { generateHash, compareHash } = require("../../utils/bcrypt");
const fs = require("fs");
const path = require("path");
const { v4 } = require("uuid");
const model = require("./model");
const tinify = require("tinify");

let TinifyKeys = [process.env.TINIFYKEY1, process.env.TINIFYKEY2, process.env.TINIFYKEY3, process.env.TINIFYKEY4, process.env.TINIFYKEY5, process.env.TINIFYKEY6, process.env.TINIFYKEY7, process.env.TINIFYKEY8];

module.exports = class UsersController {
  static async GetAll(req, res, next) {
    try {
      const imgs = await model.allImgs();
      res.status(200).json({
        success: true,
        data: imgs,
      });
    } catch (error) {
      next(error);
    }
  }

  static async GetFile(req, res, next) {
    try {
      const { name } = req.params;
      fs.readFile(path.join(process.cwd(), "..", "uploads", name), (err, data) => {
        if (err) {
          res.status(200).json({
            success: false,
            message: "File not found !",
          });
        } else {
          res.sendFile(
            path.join(process.cwd(), "..", "uploads", name),
            function (err) {
              if (err) {
                next(err);
              } else {
                next();
              }
            }
          );
        }


      });
    } catch (error) {
      next(error);
    }
  }

  static async Upload(req, res, next) {
    try {
      const { file } = req.files;
      let keyCount = 0;

      let fileName = v4() + "." + file.name.split(".").at(-1);
      await model.addImg("https://api.buxoromaktabi.uz/api/files/" + fileName);
      file.mv(__dirname + "/" + fileName, (err) => {
        if (err) throw err;
        res.status(200).json({
          success: true,
          fileUrl: "https://api.buxoromaktabi.uz/api/files/" + fileName,
        });
        tinifyCompres(TinifyKeys[keyCount]);
      });

      // Image compress with TinyPng

      function tinifyCompres(tinifyKey) {
        tinify.key = tinifyKey;

        let compressionsThisMonth = tinify.compressionCount;

        if (compressionsThisMonth > 490) {
          keyCount += 1;
          tinifyCompres(TinifyKeys[keyCount]);
        } else {
          setTimeout(function () {
            tinify
              .fromFile(__dirname + "/" + fileName)
              .toFile(path.join(process.cwd(), "..", "uploads") + fileName, function (err) {
                if (err instanceof tinify.AccountError) {
                  keyCount += 1;
                  tinifyCompres(TinifyKeys[keyCount]);
                } else {

                  fs.unlinkSync(__dirname + "/" + fileName);

                }
              });
          }, 0);
        }
      }

    } catch (error) {
      next(error);
    }
  }
};
