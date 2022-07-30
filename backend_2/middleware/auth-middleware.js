const ApiError = require('../exceptions/api-error');
const tokenService = require('../service/token-service');

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        console.log('cdajccsnansanjs')
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
        }
        console.log('nano')
        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }
        console.log('ok')
        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }

        req.user = userData;
        console.log(req.user, "lldlldl")
        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
};