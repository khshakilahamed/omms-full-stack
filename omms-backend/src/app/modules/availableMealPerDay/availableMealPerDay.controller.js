const httpStatus = require("http-status");
const sendResponse = require("../../../shared/sendResponse");
const { pick } = require("../../../shared/pick");
const { createAvailableMealPerDay, getAllAvailableMealsPerDay, getAvailableMealPerDayById, updateAvailableMealPerDayById, deleteAvailableMealPerDayItem } = require("./availableMealPerDay.service");
const { availableMealPerDayFilterableFields } = require("./availableMealPerDay.constant");

exports.createAvailableMealPerDay = async (req, res, next) => {
      try {
            const result = await createAvailableMealPerDay(req.body);

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

exports.getAllAvailableMealsPerDay = async (req, res, next) => {
      try {
            const filters = pick(req.query, availableMealPerDayFilterableFields);
            const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
            const result = await getAllAvailableMealsPerDay(filters, options);

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

exports.getAvailableMealPerDayById = async (req, res, next) => {
      try {
            const { id } = req.params;

            const result = await getAvailableMealPerDayById(id);

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

exports.updateAvailableMealPerDayById = async (req, res, next) => {
      try {
            const { id } = req.params;
            const { ...updatedData } = req.body;

            const result = await updateAvailableMealPerDayById(id, updatedData);

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

exports.deleteAvailableMealPerDayItem = async (req, res, next) => {
      try {
            const { id } = req.params;

            const data = await deleteAvailableMealPerDayItem(id);

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