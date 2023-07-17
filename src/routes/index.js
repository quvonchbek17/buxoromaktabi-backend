const FileUploadRouter = require("./fileupload/fileupload");
const TeachersRouter = require("./teachers/teachers");
const CoursesRouter = require("./courses/courses");
const NewsRouter = require("./news/news");
const ResultsRouter = require("./results/results");
const UsersRouter = require("./users/users");
const LoginRouter = require("./login/login");
const AdminsRouter = require("./admins/admins");
const CommentsRouter = require("./comments/comments");

const router = require("express").Router();

router.use("/files", FileUploadRouter);
router.use("/teachers", TeachersRouter);
router.use("/courses", CoursesRouter);
router.use("/news", NewsRouter);
router.use("/results", ResultsRouter);
router.use("/users", UsersRouter);
router.use("/login", LoginRouter);
router.use("/admins", AdminsRouter);
router.use("/comments", CommentsRouter);

module.exports = router