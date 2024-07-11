const httpStatus = require("http-status");
const config = require("../../config");
const { jwtHelpers } = require("../../helpers/jwtHelpers");
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

        /*
        *-------- agent user ----------
            * - userId means bemail
            * - agent_code //! maybe we will not use the agent code for the security purpose
            * - name means agent's name (In db, it is a full_name)
            * - role means "agent" --> static value, not connected with database
        *-------- user("compliance", "marketing", "deposit", "onlinedep", "oadmin", "group") ----
            * - userId means email
            * - name means user's name
            * - role means type
            * - per_edit means Edit Permission
            * - per_delete means Delete Permission
        */
        req.user = verifiedUser; // for user --> userId, name, role | for agent --> userId, name, agent_code, role

        // To make the guard with role
        if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
            throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
        }
        next();
    } catch (error) {
        next(error);
    }
};
