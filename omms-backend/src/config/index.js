const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.join(process.cwd(), '.env') });

const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    bycrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    // main database
    jwt: {
        secret: process.env.JWT_SECRET,
        refresh_secret: process.env.JWT_REFRESH_SECRET,
        expires_in: process.env.JWT_EXPIRES_IN,
        refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    },
    // reset_link: process.env.RESET_LINK,
};

module.exports = config
