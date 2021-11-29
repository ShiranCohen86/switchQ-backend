const express = require("express");
const {
  requireAuth,
  requireAdmin,
} = require("../../middlewares/requireAuth.middleware");
const {
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  getLoggedInUser,
  isPhoneSigned,
  getEmployees,
  addEmployee,
} = require("./user.controller");
const router = express.Router();

// middleware that is specific to this router
// router.use(requireAuth)

router.get("/", getUsers);
router.get("/loggedInUser", getLoggedInUser);
router.get("/employees", getEmployees);
router.get("/:phone", isPhoneSigned);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.post("/addEmployee", addEmployee);

// router.put('/:id',  requireAuth, updateUser)
router.delete("/:id", requireAuth, requireAdmin, deleteUser);

module.exports = router;
