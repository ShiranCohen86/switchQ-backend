const dbService = require("../../services/db.service");
const logger = require("../../services/logger.service");
const userService = require("../user/user.service");
const ObjectId = require("mongodb").ObjectId;

module.exports = {
  getSessions,
  addSession,
  // getTransfersByContactEmail,
  setStartDate,
};

async function getSessions(loggedUserId) {
  try {
    const collection = await dbService.getCollection("session");
    const sessions = await collection
      .find({ userId: ObjectId(loggedUserId) })
      .toArray();

    return sessions;
  } catch (err) {
    logger.error("cannot find users", err);
    throw err;
  }
}

async function addSession(startDate, loggedUserId, endDate) {
  try {
    const newSession = {
      userId: ObjectId(loggedUserId),
      startDate,
      endDate,
    };

    const collection = await dbService.getCollection("session");
    await collection.insertOne(newSession);

    return newSession;
  } catch (err) {
    logger.error("cannot insert user", err);
    throw err;
  }
}

async function setStartDate(startDate, loggedUserId) {
  try {
    const updatedUser = await userService.getById(loggedUserId);
    if (!updatedUser.sessionStartDate) {
      updatedUser.sessionStartDate = startDate;
      await userService.update(updatedUser);
    }
  } catch (err) {
    logger.error("cannot insert user", err);
    throw err;
  }
}

