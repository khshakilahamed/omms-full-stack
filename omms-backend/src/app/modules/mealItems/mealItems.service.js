const httpStatus = require("http-status");
const ApiError = require("../../../errors/ApiError");
const prisma = require("../../../shared/prisma");
const paginationHelpers = require("../../../helpers/paginationHelper");
const { mealItemSearchableFields } = require("./mealItems.constant");

exports.createMealItem = async (payload) => {
  const { name, mealCategoryId } = payload;

  if (!name || !mealCategoryId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Meal name and category ID are required');
  }

  const isExistMealItem = await prisma.mealItem.findFirst({
    where: {
      name: {
        equals: name,
        mode: 'insensitive'
      },
      mealCategoryId: mealCategoryId
    },
  });

  if (isExistMealItem) {
    throw new ApiError(httpStatus.CONFLICT, 'Meal already exist');
  }

  const result = await prisma.mealItem.create({
    data: {
      name,
      mealCategoryId
    }
  });

  return result
};

exports.getAllMealItems = async (filters, options) => {
  const { limit, page, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: mealItemSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: filterData[key],
          mode: 'insensitive',
        },
      })),
    });
  }

  // console.log(JSON.stringify(andConditions))

  const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.mealItem.findMany({
    include: {
      mealCategory: true
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.mealItem.count({ where: whereConditions });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

exports.getMealItemById = async (id) => {
  const result = await prisma.mealItem.findUnique({
    include: {
      mealCategory: true
    },
    where: {
      id,
    },
  });

  return result;
}

exports.updateMealItemById = async (id, payload) => {
  const isExistMealCategory = await prisma.mealItem.findUnique({
    where: {
      id,
    },
  });

  if (!isExistMealCategory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Meal Category does not exist');
  }

  const result = await prisma.mealItem.update({
    where: {
      id,
    },
    data: payload
  });

  return result;
}

exports.deleteMealItem = async (id) => {
  const result = await prisma.mealItem.delete({
    where: {
      id: id
    }
  })

  return result;
}