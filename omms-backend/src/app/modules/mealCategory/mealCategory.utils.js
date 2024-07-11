const ApiError = require("../../../errors/ApiError");
const prisma = require("../../../shared/prisma")


const isExistUser = async (email) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    }
  });

  return user;
};

const userRole = async (role) => {
  const result = await prisma.role.findUnique({
    where: {
      title: role,
    },
  });

  return result;
};

const createAgent = async (payload) => {
  const { password, roleId, ...othersData } = payload;

  const isExistUser = await UserUtils.isExistUser(payload.email);

  if (isExistUser) {
    throw new ApiError(httpStatus.CONFLICT, 'User already exist');
  }

  const hashedPassword = await hashPasswordHelpers.hashPassword(password);

  const userData = {
    email: payload.email,
    roleId: roleId,
    password: hashedPassword,
  };

  const result = await prisma.$transaction(async transactionClient => {
    const user = await transactionClient.user.create({
      data: userData,
      select: userSelectOptions,
    });

    const data = { ...othersData, userId: user.id };
    await transactionClient.customerAgent.create({ data });

    return {
      ...user,
    };
  });

  return result;
};

const UserUtils = { isExistUser, createAgent, userRole }

module.exports = UserUtils;
