const { PostComment, GetAllComments, GetOneComment, GetPaginationComments, UpdateComment, DeleteComment} = require("../../controllers/comments/comments")
const protect = require("../../middlewares/auth/protect")
const check_access = require("../../middlewares/auth/check_access")
const validate = require("../../middlewares/validation/validate")
const postComment = require("../../middlewares/validation/comments/postComment")
const updateComment = require("../../middlewares/validation/comments/updateComment")
const allid = require("../../middlewares/validation/allid")


const CommentsRouter = require('express').Router();


CommentsRouter.post("/one", validate(allid), GetOneComment);
CommentsRouter.get("/all", GetAllComments);
CommentsRouter.get("/page=:page&size=:size", GetPaginationComments);
CommentsRouter.post("/", protect,  validate(postComment), PostComment);
CommentsRouter.put("/", protect, validate(updateComment), UpdateComment);
CommentsRouter.delete("/", protect,  validate(allid), DeleteComment);


module.exports = CommentsRouter;