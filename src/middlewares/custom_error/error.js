const ErrorResponse = require("../../utils/errorHandler")

module.exports.errorMiddleware = (req, res, next) => {
    res.error = ErrorResponse;
    next()
}