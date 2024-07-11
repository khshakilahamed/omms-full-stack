
// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient()
const httpStatus = require("http-status");
const ApiError = require("../../../errors/ApiError");
const hashPasswordHelpers = require("../../../helpers/hashPasswordHelpers");
const prisma = require("./../../../shared/prisma");
const userUtils = require("./user.utils");
const { userSelectOptions } = require("./user.constant");

exports.createUser = async (payload) => {
  const { email, password } = payload;

  const isExistUser = await userUtils.isExistUser(email);

  if (isExistUser) {
    throw new ApiError(httpStatus.CONFLICT, 'User already exist');
  }

  const hashedPassword = await hashPasswordHelpers.hashPassword(password);
  payload['password'] = hashedPassword;

  // console.log(payload)

  const user = await prisma.user.create({
    data: payload,
    select: userSelectOptions
  })

  return user
};

exports.getAllUsers = async (payload) => {

  const result = await prisma.user.findMany({
    select: userSelectOptions
  });

  return result;
};

exports.deleteUser = async (id) => {
  const result = await prisma.user.delete({
    where: {
      id: id
    }
  })

  return result;

}
