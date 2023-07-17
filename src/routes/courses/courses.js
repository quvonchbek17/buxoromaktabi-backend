const {GetOneCourses, GetAllCourses, GetPaginationCourses, PostCourse, UpdateCourse, DeleteCourse } = require("../../controllers/courses/courses")
const protect = require("../../middlewares/auth/protect")
const validate = require("../../middlewares/validation/validate")
const postCourse = require("../../middlewares/validation/courses/postCourses")
const allid = require("../../middlewares/validation/allid")
const updateCourse = require("../../middlewares/validation/courses/updateCourses")

const CoursesRouter = require('express').Router();


CoursesRouter.post("/one", validate(allid), GetOneCourses);
CoursesRouter.get("/all", GetAllCourses);
CoursesRouter.get("/page=:page&size=:size", GetPaginationCourses);
CoursesRouter.post("/", protect, validate(postCourse), PostCourse);
CoursesRouter.put("/", protect, validate(updateCourse), UpdateCourse);
CoursesRouter.delete("/", protect, validate(allid), DeleteCourse);


module.exports = CoursesRouter;