const httpStatus = require("http-status");
const ApiError = require("../../../errors/ApiError");
const hashPasswordHelpers = require("../../../helpers/hashPasswordHelpers");
const prisma = require("../../../shared/prisma");
const userUtils = require("./user.utils");
const { userSelectOptions, serviceSearchableFields } = require("./user.constant");
const paginationHelpers = require("../../../helpers/paginationHelper");

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

exports.getAllUsers = async (filters, options) => {
  const { limit, page, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: serviceSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  // if (Object.keys(filterData).length > 0) {
  //   andConditions.push({
  //     AND: Object.keys(filterData).map(key => ({
  //       [key]: {
  //         equals: filterData[key],
  //       },
  //     })),
  //   });
  // }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (key === 'isBanned') {
          return {
            [key]: {
              equals: filterData[key] === 'true' ? true : false,
            }
          }
        } else {
          return {
            [key]: {
              equals: filterData[key],
            }
          }
        }
      }),
    });
  }

  // console.log(JSON.stringify(andConditions))

  const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.user.count({ where: whereConditions });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

exports.getUserById = async (id) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    select: userSelectOptions,
  });

  return result;
}

exports.updateUserById = async (id, userUpdatedData) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const result = await prisma.user.update({
    where: {
      id,
    },
    data: userUpdatedData,
    select: userSelectOptions,
  });

  return result;
}

exports.deleteUser = async (id) => {
  const result = await prisma.user.delete({
    where: {
      id: id
    },
    select: userSelectOptions
  })

  return result;
}
