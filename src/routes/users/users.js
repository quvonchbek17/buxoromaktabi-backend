const { GetAllUsers, GetPaginationUsers, GetOneUsers, PostUser, UpdateUser, DeleteUser } = require("../../controllers/users/users")

const protect = require("../../middlewares/auth/protect")
const validate = require("../../middlewares/validation/validate")
const addUser = require("../../middlewares/validation/users/postuser")
const allid = require("../../middlewares/validation/allid")
const updateUser = require("../../middlewares/validation/users/updateuser")

const UsersRouter = require('express').Router();


UsersRouter.post("/one", validate(allid), protect, GetOneUsers);
UsersRouter.get("/all", protect, GetAllUsers);
UsersRouter.get("/page=:page&size=:size", protect, GetPaginationUsers);
UsersRouter.post("/", validate(addUser), PostUser);
UsersRouter.put("/", protect, validate(updateUser), UpdateUser);
UsersRouter.delete("/", protect, validate(allid),  DeleteUser);


module.exports = UsersRouter;