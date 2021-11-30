const userService = require("./user.service");
const authService = require("../auth/auth.service");
const logger = require("../../services/logger.service");

async function addEmployee(req, res) {
  try {
    var employee = req.body;
    const loggedUserId = req.session.userId;
    employee.employerId = loggedUserId;
    const { passHash, fullname, phone, employerId } = employee;
    console.log({ fullname, passHash, phone, employerId });
    const updatedUser = await authService.signup(
      passHash,
      fullname,
      phone,
      employerId
    );

    res.send(updatedUser);
  } catch (err) {
    console.log(err);
    logger.error("Failed to add contact", err);
    res.status(500).send({ err: "Failed to add contact" });
  }
}

async function getUser(req, res) {
  try {
    const user = await userService.getById(req.params._id);
    res.send(user);
  } catch (err) {
    logger.error("Failed to get user", err);
    res.status(500).send({ err: "Failed to get user" });
  }
}

async function getEmployees(req, res) {
  try {
    const loggedInUserId = req.session.userId;
    const employees = await userService.getEmployees(loggedInUserId);
    res.send(employees);
  } catch (err) {
    logger.error("Failed to get user", err);
    res.status(500).send({ err: "Failed to get user" });
  }
}

async function getLoggedInUser(req, res) {
  let loggedInUserId;
  if (req.session.userId) {
    loggedInUserId = req.session.userId;
    updatedLoggedUser = await userService.getById(loggedInUserId);
    res.json(updatedLoggedUser);
  }
}

async function isPhoneSigned(req, res) {
  try {
    const { phone } = req.params;
    const user = await userService.getByPhone(phone);
    if (user) res.send(true);
    else res.send(false);
  } catch (err) {
    logger.error(err);
    res.status(500).send(err);
  }
}

module.exports = {
  getUser,
  getLoggedInUser,
  isPhoneSigned,
  addEmployee,
  getEmployees,
};
