const httpStatus = require("http-status");
const ApiError = require("../../../errors/ApiError");
const prisma = require("../../../shared/prisma");
const { userSelectOptions, mealCategorySearchableFields } = require("./mealCategory.constant");
const paginationHelpers = require("../../../helpers/paginationHelper");

exports.createMealCategory = async (payload) => {
  const isExistMealCategory = await prisma.mealCategory.findFirst({
    where: {
      name: {
        equals: payload?.name,
        mode: 'insensitive'
      }
    },
  });

  if (isExistMealCategory) {
    throw new ApiError(httpStatus.CONFLICT, 'Meal category already exist');
  }

  const result = await prisma.mealCategory.create({
    data: payload
  })

  return result
};

exports.getAllMealCategories = async (filters, options) => {
  const { limit, page, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: mealCategorySearchableFields.map(field => ({
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

  const result = await prisma.mealCategory.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.mealCategory.count({ where: whereConditions });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

exports.getMealCategoryById = async (id) => {
  const result = await prisma.mealCategory.findUnique({
    where: {
      id,
    },
  });

  return result;
}

exports.updateMealCategoryById = async (id, payload) => {
  const isExistMealCategory = await prisma.mealCategory.findUnique({
    where: {
      id,
    },
  });

  if (!isExistMealCategory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Meal Category does not exist');
  }

  const result = await prisma.mealCategory.update({
    where: {
      id,
    },
    data: payload
  });

  return result;
}

exports.deleteMealCategory = async (id) => {
  const result = await prisma.mealCategory.delete({
    where: {
      id: id
    }
  })

  return result;
}
