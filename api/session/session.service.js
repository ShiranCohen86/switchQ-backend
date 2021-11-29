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
    // console.log({ sessions });

    return sessions;
  } catch (err) {
    logger.error("cannot find users", err);
    throw err;
  }
}

// async function getTransfersByContactEmail(contactEmail, loggedUserId) {
//   // const criteria = _buildCriteria(filterBy);
//   try {
//     const transferCollection = await dbService.getCollection("transfer");

//     const isUser = await userService.getByEmail(contactEmail);

//     const transfers = await transferCollection
//       .find({
//         $or: [
//           {
//             from: ObjectId(loggedUserId),
//             to: isUser._id,
//           },
//           {
//             from: isUser._id,
//             to: ObjectId(loggedUserId),
//           },
//         ],
//       })
//       .toArray();

//     const transferToReturn = transfers.map((transfer) => {
//       transfer.createdAt = ObjectId(transfer._id).getTimestamp();
//       if (loggedUserId === transfer.from.toString()) {
//         transfer.to = isUser.fullname;
//         transfer.toImg = isUser.img;
//         delete transfer.from;
//       } else {
//         transfer.from = isUser.fullname;
//         transfer.fromImg = isUser.img;
//         delete transfer.to;
//       }
//       return transfer;
//     });
//     return _sortByDate(transferToReturn);
//   } catch (err) {
//     logger.error("cannot find users", err);
//     throw err;
//   }
// }

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

// const _sortByDate = (transfers) => {
//   return transfers.sort((a, b) => {
//     return a.createdAt > b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0;
//   });
// };
