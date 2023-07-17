const { Upload, GetFile, GetAll } = require("../../controllers/fileupload/fileupload")
const protect = require("../../middlewares/auth/protect")

const UploadRouter = require('express').Router();


UploadRouter.get("/:name", GetFile);
UploadRouter.get("/", protect, GetAll);
UploadRouter.post("/", protect, Upload );


module.exports = UploadRouter;