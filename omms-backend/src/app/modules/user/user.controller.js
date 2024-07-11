const httpStatus = require("http-status");
const sendResponse = require("../../../shared/sendResponse");
const { createUser, deleteUser, getAllUsers } = require("./user.service");

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

exports.getAllUsers = async (req, res, next) => {
      try {

            const data = await getAllUsers();

            sendResponse(res, {
                  statusCode: httpStatus.OK,
                  success: true,
                  message: 'Data retried successfully',
                  data: data,
            });
      } catch (error) {
            next(error)
      }
}

exports.deleteUser = async (req, res, next) => {
      try {
            const { id } = req.params;

            const data = await deleteUser(id);

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