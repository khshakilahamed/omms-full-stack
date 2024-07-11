const httpStatus = require("http-status");
const sendResponse = require("../../../shared/sendResponse");
const { createMealCategory, deleteMealCategory, getAllMealCategories, getMealCategoryById, updateMealCategoryById } = require("./mealCategory.service");
const { mealCategoryFilterableFields } = require("./mealCategory.constant");
const { pick } = require("../../../shared/pick");

exports.createMealCategory = async (req, res, next) => {
      try {
            const result = await createMealCategory(req.body);

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

exports.getAllMealCategories = async (req, res, next) => {
      try {
            const filters = pick(req.query, mealCategoryFilterableFields);
            const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
            const result = await getAllMealCategories(filters, options);

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

exports.getMealCategoryById = async (req, res, next) => {
      try {
            const { id } = req.params;

            const result = await getMealCategoryById(id);

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

exports.updateMealCategoryById = async (req, res, next) => {
      try {
            const { id } = req.params;
            const { ...updatedData } = req.body;

            const result = await updateMealCategoryById(id, updatedData);

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

exports.deleteMealCategory = async (req, res, next) => {
      try {
            const { id } = req.params;

            const data = await deleteMealCategory(id);

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