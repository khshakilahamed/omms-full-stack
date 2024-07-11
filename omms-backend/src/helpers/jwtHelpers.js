const jwt = require('jsonwebtoken');
const ApiError = require('../errors/ApiError');
const httpStatus = require('http-status');

const createToken = (payload, secret, expireTime) => {
    return jwt.sign(payload, secret, {
        expiresIn: expireTime,
    });
};

const verifyToken = (token, secret) => {
    // return jwt.verify(token, secret);
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        if (error?.message === "jwt expired") {
            //! Don't change this message, it is used in the axios for new access token
            throw new ApiError(httpStatus.UNAUTHORIZED, "jwt expired");
        }
        // throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error by kh.");
        throw Error(error)
    }
};


exports.jwtHelpers = { createToken, verifyToken }
