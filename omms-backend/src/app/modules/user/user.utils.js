const prisma = require("./../../../shared/prisma")

const isExistUser = async (email) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    }
  });

  return user;
};

const UserUtils = { isExistUser }

module.exports = UserUtils;
