const express = require("express");
const {
  requireAuth,
  requireAdmin,
} = require("../../middlewares/requireAuth.middleware");
const {
  getUser,

  getLoggedInUser,
  isPhoneSigned,
  getEmployees,
  addEmployee,
} = require("./user.controller");
const router = express.Router();

// middleware that is specific to this router
// router.use(requireAuth)

router.get("/loggedInUser", getLoggedInUser);
router.get("/employees", getEmployees);
router.get("/:phone", isPhoneSigned);
router.get("/:id", getUser);

router.post("/addEmployee", addEmployee);

module.exports = router;
