const config = require("./../config");
const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    const newPassword = bcrypt.hash(password, Number(config.bycrypt_salt_rounds));

    return newPassword;
};

const isPasswordMatched = async (password, hashedPassword) => {
    const result = await bcrypt.compare(password, hashedPassword);

    return result;
};

const hashPasswordHelpers = {
    hashPassword,
    isPasswordMatched,
};

module.exports = hashPasswordHelpers;
