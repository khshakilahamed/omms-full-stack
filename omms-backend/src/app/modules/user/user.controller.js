const httpStatus = require("http-status");
const sendResponse = require("../../../shared/sendResponse");
const { createUser, deleteUser, getAllUsers, getUserById, updateUserById } = require("./user.service");
const { serviceFilterableFields } = require("./user.constant");
const { pick } = require("../../../shared/pick");

exports.createUser = async (req, res, next) => {
      try {
            const result = await createUser(req.body);

            sendResponse(res, {
                  statusCode: httpStatus.OK,
                  success: true,
                  message: 'Data inserted successfully',
                  data: result,
            });
      } catch (error) {
            next(error)
      }
}

exports.getAllUsers = async (req, res, next) => {
      try {
            const filters = pick(req.query, serviceFilterableFields);
            const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
            const result = await getAllUsers(filters, options);

            sendResponse(res, {
                  statusCode: httpStatus.OK,
                  success: true,
                  message: 'Data retrieved successfully',
                  data: result,
            });
      } catch (error) {
            next(error)
      }
}

exports.getUserById = async (req, res, next) => {
      try {
            const { id } = req.params;

            const result = await getUserById(id);

            sendResponse(res, {
                  statusCode: httpStatus.OK,
                  success: true,
                  message: 'Data retrieved successfully',
                  data: result,
            });
      } catch (error) {
            next(error)
      }
}
exports.updateUserById = async (req, res, next) => {
      try {
            const { id } = req.params;
            const { ...userUpdatedData } = req.body;

            const result = await updateUserById(id, userUpdatedData);

            sendResponse(res, {
                  statusCode: httpStatus.OK,
                  success: true,
                  message: 'Data updated successfully',
                  data: result,
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
                  message: 'Data Deleted successfully',
                  data: data,
            });
      } catch (error) {
            next(error)
      }
}