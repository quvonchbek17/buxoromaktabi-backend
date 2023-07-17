const { GetAllTeachers, GetOneTeachers, GetPaginationTeachers, PostTeacher, UpdateTeacher, DeleteTeacher } = require("../../controllers/teachers/teacher")
const protect = require("../../middlewares/auth/protect")
const validate = require("../../middlewares/validation/validate")
const postteacher = require("../../middlewares/validation/teachers/postTeacher")
const allid = require("../../middlewares/validation/allid")
const updateTeacher = require("../../middlewares/validation/teachers/updateTeacher")

const TeachersRouter = require('express').Router();


TeachersRouter.post("/one", protect, validate(allid), GetOneTeachers);
TeachersRouter.get("/all", protect, GetAllTeachers);
TeachersRouter.get("/page=:page&size=:size", protect, GetPaginationTeachers);
TeachersRouter.post("/", protect, validate(postteacher), PostTeacher);
TeachersRouter.put("/", protect, validate(updateTeacher), UpdateTeacher);
TeachersRouter.delete("/", protect, validate(allid), DeleteTeacher);


module.exports = TeachersRouter;