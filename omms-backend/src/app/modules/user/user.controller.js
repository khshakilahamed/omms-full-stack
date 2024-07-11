const httpStatus = require("http-status");
const sendResponse = require("../../../shared/sendResponse");
const { createUser } = require("./user.service");

exports.createUser = async (req, res, next) => {
      try {
            const data = await createUser(req.body);

            sendResponse(res, {
                  statusCode: httpStatus.OK,
                  success: true,
                  message: 'Data inserted successfully',
                  data: data,
            });
      } catch (error) {
            next(error)
      }
}