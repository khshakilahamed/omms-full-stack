// import { PrismaClient } from "@prisma/client";
const app = require("./app");

const port = process.env.PORT || 5000;
async function main() {
  try {
    app.listen(port, () => {
      console.log(`Application  listening on port ${port}`)
    })
  } catch (err) {
    console.error('Failed to connect database', err)
  }
}

main();