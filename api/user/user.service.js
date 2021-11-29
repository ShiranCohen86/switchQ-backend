const dbService = require("../../services/db.service");
const logger = require("../../services/logger.service");
// const contactService = require("../contact/contact.service");
const ObjectId = require("mongodb").ObjectId;

module.exports = {
  getEmployees,
  getById,
  getByPhone,
  // remove,
  update,
  add,

  // getHeaderDetails,
  // getBalance,
};

async function getEmployees(loggedUserId) {
  try {
    const collection = await dbService.getCollection("user");
    let users = await collection.find({ employerId: loggedUserId }).toArray();
    users = users.map((user) => {
      user.createdAt = ObjectId(user._id).getTimestamp();

      return user;
    });
    return users;
  } catch (err) {
    logger.error("cannot find users", err);
    throw err;
  }
}

async function getById(userId) {
  try {
    const collection = await dbService.getCollection("user");
    const user = await collection.findOne({ _id: ObjectId(userId) });
    // delete user.passHash;

    return user;
  } catch (err) {
    logger.error(`while finding user ${userId}`, err);
    throw err;
  }
}

// async function getHeaderDetails(userId) {
//   try {
//     const collection = await dbService.getCollection("user");
//     const user = await collection.findOne({ _id: ObjectId(userId) });
//     // const test = await collection.find(
//     //   { _id: ObjectId(userId) }.project({ coins: 1, fullname: 1 })
//     // );

//     return { balance: user.coins, fullname: user.fullname };
//   } catch (err) {
//     logger.error(`while finding user ${userId}`, err);
//     throw err;
//   }
// }
// async function getBalance(userId) {
//   try {
//     const collection = await dbService.getCollection("user");
//     const user = await collection.findOne({ _id: ObjectId(userId) });

//     return user.coins;
//   } catch (err) {
//     logger.error(`while finding user ${userId}`, err);
//     throw err;
//   }
// }

async function getByPhone(phone) {
  try {
    const collection = await dbService.getCollection("user");
    const user = await collection.findOne({ phone });
    return user;
  } catch (err) {
    logger.error(`while finding phone ${phone}`, err);
    throw err;
  }
}

// async function remove(userId) {
//   try {
//     const collection = await dbService.getCollection("user");
//     await collection.deleteOne({ _id: ObjectId(userId) });
//   } catch (err) {
//     logger.error(`cannot remove user ${userId}`, err);
//     throw err;
//   }
// }

async function update(user) {
  try {
    // peek only updatable fields!

    const collection = await dbService.getCollection("user");
    user._id = ObjectId(user._id);
    await collection.updateOne({ _id: user._id }, { $set: user });
    return user;
  } catch (err) {
    logger.error(`cannot update user ${user._id}`, err);
    throw err;
  }
}

async function add(user) {
  try {
    const userToAdd = {
      passHash: user.passHash,
      fullname: user.fullname,
      phone: user.phone,
      employerId: user.employerId,
    };

    const collection = await dbService.getCollection("user");
    await collection.insertOne(userToAdd);

    return userToAdd;
  } catch (err) {
    logger.error("cannot insert user", err);
    throw err;
  }
}

// function _buildCriteria(filterBy) {
//   const criteria = {};
//   if (filterBy.txt) {
//     const txtCriteria = { $regex: filterBy.txt, $options: "i" };
//     criteria.$or = [
//       // {
//       //   username: txtCriteria,
//       // },
//       {
//         fullname: txtCriteria,
//       },
//     ];
//   }
//   if (filterBy.minBalance) {
//     criteria.balance = { $gte: filterBy.minBalance };
//   }
//   return criteria;
// }
