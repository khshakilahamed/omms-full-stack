
const config = require("../../config");
const ApiError = require("../../errors/ApiError");
const handleCastError = require("../../errors/handleCastError");
const { handleClientError } = require("../../errors/handleClientError");
const handleValidationError = require("../../errors/handleValidationError");
const { Prisma } = require("@prisma/client")

const globalErrorHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorMessages = [];

  //

  if (error instanceof Prisma.PrismaClientValidationError) {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }
  else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    statusCode = 400;
    const lines = error.message.trim().split('\n');
    // console.log(lines[lines.length - 1])
    message = lines[lines.length - 1];

    const simplifiedError = handleClientError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }
  else if (error?.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }
  else if (error?.code === 11000) {
    message = error?.message;
    errorMessages = error?.message
      ? [
        {
          path: "",
          message: error?.message,
        },
      ]
      : [];
  }
  else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [
        {
          path: "",
          message: error?.message,
        },
      ]
      : [];
  }
  else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
        {
          path: "",
          message: error?.message,
        },
      ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    // stack: error?.stack,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });

  // next();
};

module.exports = globalErrorHandler;
