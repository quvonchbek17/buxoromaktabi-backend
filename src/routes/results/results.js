const { GetAllResults, GetOneResults, GetPaginationResults, PostResult, UpdateResult, DeleteResult } = require("../../controllers/results/results")
const protect = require("../../middlewares/auth/protect")
const validate = require("../../middlewares/validation/validate")
const allid = require("../../middlewares/validation/allid")
const postResults = require("../../middlewares/validation/results/postResult")
const updateResult = require("../../middlewares/validation/results/updateResult")

const ResultsRouter = require('express').Router();


ResultsRouter.post("/one", validate(allid), GetOneResults);
ResultsRouter.get("/all", GetAllResults);
ResultsRouter.get("/page=:page&size=:size", GetPaginationResults);
ResultsRouter.post("/", protect, validate(postResults), PostResult);
ResultsRouter.put("/", protect, validate(updateResult), UpdateResult);
ResultsRouter.delete("/", protect, validate(allid), DeleteResult);


module.exports = ResultsRouter;