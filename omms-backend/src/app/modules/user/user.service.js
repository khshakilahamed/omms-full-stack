
// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient()
const prisma = require("./../../../shared/prisma")

exports.createUser = async (payload) => {
  console.log(payload)

  const user = await prisma.user.create({ data: payload })

  return user
};

exports.getAllUsers = async (payload) => {
  
  const result = await prisma.user.findMany();

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
