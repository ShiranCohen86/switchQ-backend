const bcrypt = require("bcrypt");
const userService = require("../user/user.service");
const logger = require("../../services/logger.service");
const { use } = require("./auth.routes");

async function login(phone, passHash) {
  logger.debug(`auth.service - login with phone: ${phone}`);

  const user = await userService.getByPhone(phone);
  if (!user) return Promise.reject("Invalid phone");
  const match = await bcrypt.compare(passHash, user.passHash);
  if (!match) return Promise.reject("Invalid passHash");
  delete user.passHash;

  return user;
}

async function signup(passHash, fullname, phone, employerId = null) {
  const saltRounds = 10;

  logger.debug(
    `auth.service - signup with phone: ${phone}, fullname: ${fullname}`
  );
  if (!passHash || !fullname || !phone)
    return Promise.reject("fullname, phone and passHash are required!");
  const isPhoneExist = await userService.getByPhone(phone);
  if (isPhoneExist) return Promise.reject("This phone is already signed");

  const hash = await bcrypt.hash(passHash, saltRounds);
  return userService.add({ passHash: hash, fullname, phone, employerId });
}

module.exports = {
  signup,
  login,
};
