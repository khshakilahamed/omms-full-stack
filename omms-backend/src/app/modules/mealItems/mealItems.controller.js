const httpStatus = require("http-status");
const sendResponse = require("../../../shared/sendResponse");
const { pick } = require("../../../shared/pick");
const { createMealItem, getAllMealItems, getMealItemById, updateMealItemById, deleteMealItem } = require("./mealItems.service");
const { mealItemFilterableFields } = require("./mealItems.constant");

exports.createMealItem = async (req, res, next) => {
      try {
            const result = await createMealItem(req.body);

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

exports.getAllMealItems = async (req, res, next) => {
      try {
            const filters = pick(req.query, mealItemFilterableFields);
            const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
            const result = await getAllMealItems(filters, options);

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

exports.getMealItemById = async (req, res, next) => {
      try {
            const { id } = req.params;

            const result = await getMealItemById(id);

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

exports.updateMealItemById = async (req, res, next) => {
      try {
            const { id } = req.params;
            const { ...updatedData } = req.body;

            const result = await updateMealItemById(id, updatedData);

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

exports.deleteMealItem = async (req, res, next) => {
      try {
            const { id } = req.params;

            const data = await deleteMealItem(id);

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