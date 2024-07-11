const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.join(process.cwd(), '.env') });

const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    bycrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    // main database
    db_connection: {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    },
    // doc database
    db_connection_doc: {
        host: process.env.HOST_DOC,
        user: process.env.USER_DOC,
        password: process.env.PASSWORD_DOC,
        database: process.env.DATABASE_DOC,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        refresh_secret: process.env.JWT_REFRESH_SECRET,
        expires_in: process.env.JWT_EXPIRES_IN,
        refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    },
    cloudinary: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    },
    aws: {
        access_key: process.env.ACCESS_KEY_ID,
        secret_key: process.env.SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
        bucket: process.env.BUCKET_NAME,
    },
    mail: {
        user: process.env.EMAIL,
        pass: process.env.MAIL_PASS,
    }
    // reset_link: process.env.RESET_LINK,
};

module.exports = config
