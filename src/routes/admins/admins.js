const { GetAllAdmins, GetPaginationAdmins,  PostAdmin, AdminUpdateCheck, UpdateAdmin,DeleteAdmin } = require("../../controllers/admins/admins")
const protect = require("../../middlewares/auth/protect")
const check_access = require("../../middlewares/auth/check_access")
const validate = require("../../middlewares/validation/validate")
const postAdmin = require("../../middlewares/validation/admins/postAdmin")
const updateAdmin = require("../../middlewares/validation/admins/updateAdmin")
const allid = require("../../middlewares/validation/allid")
const allPassword = require("../../middlewares/validation/admins/updateAdmin")


const AdminsRouter = require('express').Router();


// AdminsRouter.get("/one", GetOneAdmins);
AdminsRouter.get("/all", protect, check_access("get_admins"), GetAllAdmins);
AdminsRouter.get("/page=:page&size=:size", protect, check_access("get_admins"), GetPaginationAdmins);
AdminsRouter.post("/", protect, check_access("post_admin"), validate(postAdmin), PostAdmin);
AdminsRouter.post("/check", protect, validate(allPassword), AdminUpdateCheck);
AdminsRouter.put("/", protect, validate(updateAdmin), UpdateAdmin);
AdminsRouter.delete("/", protect, check_access("delete_admins"), validate(allid), DeleteAdmin);


module.exports = AdminsRouter;