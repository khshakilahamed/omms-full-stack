const httpStatus = require("http-status");
const ApiError = require("../../../errors/ApiError");
const prisma = require("../../../shared/prisma");
const paginationHelpers = require("../../../helpers/paginationHelper");
const { orderSearchableFields } = require("./order.constant");
const { parseDate } = require("./order.utils");

exports.createOrder = async (payload) => {
  const isOrderExist = await prisma.order.findFirst({
    where: {
      dayName: payload?.dayName,
      date: payload?.date
    }
  });

  if (isOrderExist) {
    throw new ApiError(httpStatus.CONFLICT, "Your order already exist");
  }


  const result = await prisma.order.create({
    data: payload,
    include: {
      chosenMeal1: true,
      chosenMeal2: true,
      chosenMeal3: true
    }
  })

  return result
};

exports.getAllOrders = async (filters, options) => {
  const { limit, page, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: orderSearchableFields.map(field => ({
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

  const result = await prisma.order.findMany({
    include: {
      chosenMeal1: true,
      chosenMeal2: true,
      chosenMeal3: true,
      user: true
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.order.count({ where: whereConditions });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

exports.getMyOrders = async (filters, options) => {
  const { limit, page, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: orderSearchableFields.map(field => ({
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
          equals: filterData[key]
        },
      })),
    });
  }

  // console.log(JSON.stringify(andConditions))

  const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.order.findMany({
    include: {
      chosenMeal1: true,
      chosenMeal2: true,
      chosenMeal3: true
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.order.count({ where: whereConditions });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

exports.getOrderById = async (id) => {
  const result = await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      chosenMeal1: true,
      chosenMeal2: true,
      chosenMeal3: true
    }
  });

  return result;
}

exports.updateOrderById = async (id, payload) => {
  const isExistOrder = await prisma.order.findUnique({
    where: {
      id,
    },
  });

  if (!isExistOrder) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order does not exist');
  }

  const today = new Date();
  const specificDate = parseDate(isExistOrder?.date);
  // console.log(specificDate)

  // the older order can not be modified
  if (today > specificDate) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Past order you can not modify')
  }

  const result = await prisma.order.update({
    where: {
      id,
    },
    data: payload,
    include: {
      chosenMeal1: true,
      chosenMeal2: true,
      chosenMeal3: true
    }
  });

  return result;
}

exports.deleteOrder = async (id) => {
  const isExistOrder = await prisma.order.findUnique({
    where: {
      id,
    },
  });

  if (!isExistOrder) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order does not exist');
  }

  const today = new Date();
  const specificDate = parseDate(isExistOrder?.date);
  // console.log(specificDate)

  // the older order can not be deleted
  if (today > specificDate) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Past order you can not be deleted')
  }

  const result = await prisma.order.delete({
    where: {
      id: id
    }
  })

  return result;
}
