const httpStatus = require("http-status");
const sendResponse = require("../../../shared/sendResponse");
const { pick } = require("../../../shared/pick");
const { createOrder, getAllOrders, getOrderById, updateOrderById, deleteOrder, getMyOrders } = require("./order.service");
const { orderFilterableFields } = require("./order.constant");

exports.createOrder = async (req, res, next) => {
      try {
            const orderData = req.body;
            orderData["userId"] = req?.user?.userId;

            const result = await createOrder(orderData);

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

exports.getMyOrders = async (req, res, next) => {
      try {
            req.query['userId'] = req?.user?.userId
            const filters = pick(req.query, orderFilterableFields);
            const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
            const result = await getMyOrders(filters, options);

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

exports.getAllOrders = async (req, res, next) => {
      try {
            console.log(req.user)
            const filters = pick(req.query, orderFilterableFields);
            const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
            const result = await getAllOrders(filters, options);

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

exports.getOrderById = async (req, res, next) => {
      try {
            const { id } = req.params;

            const result = await getOrderById(id);

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

exports.updateOrderById = async (req, res, next) => {
      try {
            const { id } = req.params;
            const { ...updatedData } = req.body;

            const result = await updateOrderById(id, updatedData);

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

exports.deleteOrder = async (req, res, next) => {
      try {
            const { id } = req.params;

            const data = await deleteOrder(id);

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