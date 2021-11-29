const userService = require("./user.service");
const authService = require("../auth/auth.service");
const socketService = require("../../services/socket.service");
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
    // console.log("CTRL SessionId:", req.sessionID);
    // socketService.broadcast({ type: "contact-added", data: contact });
    // socketService.emitToAll({
    //   type: "user-updated",
    //   data: contact.byUser,
    //   room: req.session.user._id,
    // });
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

async function getUsers(req, res) {
  try {
    const filterBy = {
      txt: req.query?.txt || "",
    };
    const users = await userService.query(filterBy);
    res.send(users);
  } catch (err) {
    logger.error("Failed to get users", err);
    res.status(500).send({ err: "Failed to get users" });
  }
}

async function deleteUser(req, res) {
  try {
    await userService.remove(req.params.id);
    res.send({ msg: "Deleted successfully" });
  } catch (err) {
    logger.error("Failed to delete user", err);
    res.status(500).send({ err: "Failed to delete user" });
  }
}

async function updateUser(req, res) {
  try {
    const user = req.body;
    const savedUser = await userService.update(user);
    res.send(savedUser);
    // socketService.broadcast({
    //   type: "user-updated",
    //   data: review,
    //   to: savedUser._id,
    // });
  } catch (err) {
    logger.error("Failed to update user", err);
    res.status(500).send({ err: "Failed to update user" });
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
  getUsers,
  deleteUser,
  updateUser,
  getLoggedInUser,
  isPhoneSigned,
  addEmployee,
  getEmployees,
};
