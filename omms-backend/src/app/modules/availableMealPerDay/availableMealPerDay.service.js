const httpStatus = require("http-status");
const ApiError = require("../../../errors/ApiError");
const prisma = require("../../../shared/prisma");
const paginationHelpers = require("../../../helpers/paginationHelper");
const { availableMealPerDaySearchableFields } = require("./availableMealPerDay.constant");

exports.createAvailableMealPerDay = async (payload) => {
  const { dayName, riceId, proteinMealId, otherItemId1, otherItemId2, otherItemId3 } = payload;

  // if (!name || !mealCategoryId) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Meal name and category ID are required');
  // }

  // is day name already exist or not
  const isDayNameExist = await prisma.availableMealPerDay.findFirst({
    where: {
      dayName: dayName
    },
  });

  if (isDayNameExist) {
    throw new ApiError(httpStatus.CONFLICT, `${dayName} is already exist`);
  }

  // is riceId provided or not
  if (!riceId) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Starch item is required');
  }

  // verify the rice id is in starch category or not
  const riceDetails = await prisma.mealItem.findFirst({
    include: {
      mealCategory: true
    },
    where: {
      id: riceId
    }
  });

  if (riceDetails.mealCategory.name !== 'starch') {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Your selected rice item is not in starch category');
  }

  // verify the protein id is in protein category or not
  const proteinDetails = await prisma.mealItem.findFirst({
    include: {
      mealCategory: true
    },
    where: {
      id: riceId
    }
  });

  // verify the protein id is already exist 2 times in a week
  const countProtein = await prisma.availableMealPerDay.findMany({
    where: {
      proteinMealId: proteinMealId
    }
  })

  if (countProtein.length >= 2) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'You can not add same protein item more than two days');
  }

  const result = await prisma.availableMealPerDay.create({
    data: {
      dayName,
      riceId,
      proteinMealId,
      otherItemId1,
      otherItemId2,
      otherItemId3
    },
    include: {
      rice: true,
      proteinMeal: true,
      otherItem1: true,
      otherItem2: true,
      otherItem3: true,
    }
  });

  return result
};

exports.getAllAvailableMealsPerDay = async (filters, options) => {
  const { limit, page, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: availableMealPerDaySearchableFields.map(field => ({
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

  const result = await prisma.availableMealPerDay.findMany({
    include: {
      rice: true,
      proteinMeal: true,
      otherItem1: true,
      otherItem2: true,
      otherItem3: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.availableMealPerDay.count({ where: whereConditions });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

exports.getAvailableMealPerDayById = async (id) => {
  const result = await prisma.availableMealPerDay.findUnique({
    include: {
      rice: true,
      proteinMeal: true,
      otherItem1: true,
      otherItem2: true,
      otherItem3: true,
    },
    where: {
      id,
    },
  });

  return result;
}

exports.updateAvailableMealPerDayById = async (id, payload) => {
  const isExistMealCategory = await prisma.availableMealPerDay.findUnique({
    where: {
      id,
    },
  });

  if (!isExistMealCategory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Meal Category does not exist');
  }

  const result = await prisma.availableMealPerDay.update({
    include: {
      rice: true,
      proteinMeal: true,
      otherItem1: true,
      otherItem2: true,
      otherItem3: true,
    },
    where: {
      id,
    },
    data: payload
  });

  return result;
}

exports.deleteAvailableMealPerDayItem = async (id) => {
  const result = await prisma.availableMealPerDay.delete({
    where: {
      id: id
    }
  })

  return result;
}
