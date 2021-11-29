const sessionService = require("./session.service");
const socketService = require("../../services/socket.service");
const logger = require("../../services/logger.service");

async function addSession(req, res) {
  try {
    const { startDate } = req.body;
    const { endDate } = req.body;
    const loggedUserId = req.session.userId;

    const session = await sessionService.addSession(
      startDate,
      loggedUserId,
      endDate
    );

    res.send(session);
  } catch (err) {
    // logger.error("Failed to update user", err);
    res.status(500).send(err);
  }
}

async function setStartDate(req, res) {
  const { startDate } = req.body;
  const { loggedUserId } = req.body;
  try {
    await sessionService.setStartDate(startDate, loggedUserId);
  } catch (err) {
    // logger.error("Failed to update user", err);
    res.status(500).send(err);
  }
}

async function getSessions(req, res) {
  try {
    const loggedUserId = req.session.userId;
    
    const sessions = await sessionService.getSessions(loggedUserId);
    res.send(sessions);
  } catch (err) {
    logger.error("Failed to update user", err);
    res.status(500).send({ err: "Failed to update user" });
  }
}

// async function getTransfersByContactEmail(req, res) {
//   try {
//     const contactEmail = req.params.email;
//     const loggedUserId = req.session.userId;
//     const transfers = await transferService.getTransfersByContactEmail(
//       contactEmail,
//       loggedUserId
//     );
//     res.send(transfers);
//   } catch (err) {
//     logger.error("Failed to update user", err);
//     res.status(500).send({ err: "Failed to update user" });
//   }
// }

module.exports = {
  addSession,
  getSessions,
  // getTransfersByContactEmail,
  setStartDate,
};
