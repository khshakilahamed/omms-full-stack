const httpStatus = require("http-status");
const config = require("../../config");
const jwtHelpers  = require("../../helpers/jwtHelpers");
const ApiError = require("../../errors/ApiError");

/*
* The auth function is working as a middleware.
* The main task of this middleware:
*   - get the token(jwt) from the headers and verify it.
*   - if the user is authorized then the user can go to the next step, otherwise get an error.
*/

exports.auth = (...requiredRoles) => async (req, res, next) => {
    try {
        //get authorization token
        const token = req.headers.authorization;
        if (!token) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
        }

        // verify token
        let verifiedUser = null;
        verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret);

        req.user = verifiedUser; // admin, general_user

        // To make the guard with role
        if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
            throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
        }
        next();
    } catch (error) {
        next(error);
    }
};
