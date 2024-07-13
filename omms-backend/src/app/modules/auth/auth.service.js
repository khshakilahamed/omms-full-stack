const httpStatus = require("http-status");
const UserUtils = require("../user/user.utils");
const hashPasswordHelpers = require("./../../../helpers/hashPasswordHelpers");
const jwtHelpers = require("../../../helpers/jwtHelpers");
const config = require("../../../config");
const ApiError = require("../../../errors/ApiError");

exports.login = async (payload) => {
  const { email, password } = payload;

  const isExistUser = await UserUtils.isExistUser(email);

  if (!isExistUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not found');
  }

  const isPasswordMatched = await hashPasswordHelpers.isPasswordMatched(
    password,
    isExistUser.password,
  );

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //   console.log(isPasswordMatched);
  const accessToken = jwtHelpers.createToken(
    {
      userId: isExistUser.id,
      name: isExistUser.name,
      email: isExistUser.email,
      role: isExistUser.role,
    },
    config.jwt.secret,
    config.jwt.expires_in,
  );

  const refreshToken = jwtHelpers.createToken(
    {
      userId: isExistUser.id,
      email: isExistUser.email,
      role: isExistUser.role.title,
    },
    config.jwt.refresh_secret,
    config.jwt.refresh_expires_in,
  );

  return {
    accessToken,
    refreshToken,
  };
};