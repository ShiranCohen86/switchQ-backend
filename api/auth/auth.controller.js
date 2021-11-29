const authService = require("./auth.service");
const logger = require("../../services/logger.service");

async function login(req, res) {
  const { phone, passHash } = req.body;
  try {
    const user = await authService.login(phone, passHash);

    req.session.userId = user._id;

    res.json(user);
  } catch (err) {
    logger.error("Failed to Login " + err);
    res.status(401).send(err);
  }
}

async function signup(req, res) {
  try {
    const { passHash, fullname, phone } = req.body;

    const user = await authService.signup(passHash, fullname, phone);
    logger.debug(`auth.route - new user created: ` + JSON.stringify(user));
    delete user.passHash;
    req.session.userId = user._id;

    res.json(user);
  } catch (err) {
    logger.error("Failed to signup " + err);
    res.status(500).send({ err: "Failed to signup" });
  }
}

async function logout(req, res) {
  try {
    req.session.destroy();
    res.send({ msg: "Logged out successfully" });
  } catch (err) {
    res.status(500).send({ err: "Failed to logout" });
  }
}

module.exports = {
  login,
  signup,
  logout,
};
