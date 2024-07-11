// import { PrismaClient } from "@prisma/client";
const app = require("./app");

// const prisma = new PrismaClient();
const port = process.env.PORT || 3003;
async function main() {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

main();