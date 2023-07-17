const {GetOneNews, GetAllNews, GetPaginationNews, PostNews, UpdateNews, DeleteNews } = require("../../controllers/news/news")
const protect = require("../../middlewares/auth/protect")

const NewsRouter = require('express').Router();
const validate = require("../../middlewares/validation/validate")
const allid = require("../../middlewares/validation/allid")
const postNews = require("../../middlewares/validation/news/postNews")
const updateNews = require("../../middlewares/validation/news/updatenews")


NewsRouter.post("/one", validate(allid), GetOneNews);
NewsRouter.get("/all", GetAllNews);
NewsRouter.get("/page=:page&size=:size", GetPaginationNews);
NewsRouter.post("/",protect, validate(postNews), PostNews);
NewsRouter.put("/", protect, validate(updateNews), UpdateNews);
NewsRouter.delete("/", protect, validate(allid), DeleteNews);


module.exports = NewsRouter;