const httpStatus = require("http-status");
const config = require("../../../config");
const sendResponse = require("../../../shared/sendResponse");
const { login } = require("./auth.service");

exports.login = async (req, res, next) => {
      try {
            const result = await login(req.body);

            const { refreshToken, accessToken } = result;

            const cookieOptions = {
                  secure: config.env === 'production',
                  httpOnly: true,
            };

            res.cookie('refreshToken', refreshToken, cookieOptions);

            sendResponse(res, {
                  statusCode: httpStatus.OK,
                  success: true,
                  message: 'Data inserted successfully',
                  data: { accessToken },
            });
      } catch (error) {
            next(error)
      }
}