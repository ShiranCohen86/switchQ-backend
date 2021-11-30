const express = require("express");
const {
  requireAuth,
  requireAdmin,
} = require("../../middlewares/requireAuth.middleware");
const {
  addSession,
  getSessions,
  setStartDate,
} = require("./session.controller");
const router = express.Router();

// middleware that is specific to this router
// router.use(requireAuth)

router.get("/", getSessions);
router.post("/startDate", setStartDate);
router.post("/", addSession);

module.exports = router;
