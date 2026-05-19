// import mongoose from 'mongoose';
// import mongoose from './../node_modules/mongoose/types/index.d';
// import { type } from './../node_modules/sift/lib/core.d';
import mongoose, { model } from "mongoose";
// import { responseCreator,errorCreator } from "../utils/responseHandler";
import responseHandler from "../utils/responseHandler.js";
const { errorCreator, responseCreator } = responseHandler;
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is Mandatory!!!"],
  },
  username: {
    type: String,
    unique: true,
    required: [true, "name is Mandatory!!!"],
  },
  password: {
    type: String,
    validate: {
      validator: (value) => value.length >= 8,
      message: (data) => "Password should be atleast 8 chars!!!",
    },
  },
  friendList: {
    type: [String],
  },
  secret: {
    type: String,
  },
});

userSchema.statics.createUser = async (userData) => {
  // try {
  const data = await UserModel.create(userData);
  console.log(data);
  // const data = await UserModel.create(userData);
  // console.log(data);
  if (data) {
    return data;
    // res.status(201);
    // res.send(`user ${userData.username} created success..`);
  }
  // } catch (error) {
  //   next(error);
  // console.log(error);
  //   // res.status(500);
  //   // res.send({ success: false, msg: error.message });
  // }
};

userSchema.statics.getUser = async (username) => {
  // const { username, password } = req.body;
  const userData = (
    await UserModel.findOne({ username }, { _id: 0, __v: 0 })
  )?.toObject();
  if (userData) {
    return userData;
    // user exist , match pwd now
    // if (password === userData.password) {
    //   res.send({
    //     success: true,
    //     msg: `${username} logged in success`,
    //     data: userData,
    //   });
    // } else {
    // const err = new Error("Incorrect Pwd!!!");
    // err.status = 401;
    // throw err;
    // }
  } else {
    errorCreator("Incorrect Pwd!!!", 401);
    // const err = new Error("User doesn't exist!!!");
    // err.status = 404;
    // throw err;
  }
};

userSchema.statics.updateFriend = async (username, id, addFriend = true) => {
  // try {
  let data;
  if (addFriend) {
    data = await UserModel.updateOne(
      { username },
      { $addToSet: { friendList: id } },
    );
  } else {
    data = await UserModel.updateOne(
      { username },
      { $pull: { friendList: id } },
    );
  }
  // const { username, id, name } = req.body;

  // const data = await UserModel.updateOne(
  //   { username },
  //   { $addToSet: { friendList: id } },
  // );
  if (data.modifiedCount || data.matchedCount) {
    return UserModel.getUser(username);
    // res.status(200);
    // res.send({ success: true, msg: `You are now friend with ${name}` });
  }
  // else {
  //   const err = new Error("Something went wrong!!!");
  //   err.status = 500;
  //   throw err;
  // }
  // } catch (error) {
  //   next(error);
  // console.log(error);
  //   // res.status(error.status || 500);
  //   // res.send({ success: false, msg: error.message });
  // }
};
// userSchema.statics.removeFriend = async (req, res, next) => {
//   try {
//     const { username, id, name } = req.body;

//     const data = await UserModel.updateOne(
//       { username },
//       { $pull: { friendList: id } },
//     );
//     if (data.modifiedCount) {
//       res.status(200);
//       res.send({ success: true, msg: `You are no longer friend with ${name}` });
//     } else {
//       const err = new Error("Something went wrong!!!");
//       err.status = 500;
//       throw err;
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(error.status || 500);
//     res.send({ success: false, msg: error.message });
//   }
// };

//Updating the password
//Updating the secret Code

userSchema.statics.updateUser = async (username, data) => {
  const updateData = await UserModel.updateOne(
    { username },
    {
      $set: { ...data }
    }
  );
  if (updateData.modifiedCount) {
    return true;
  } else {
    errorCreator("Something went Wrong!!!");
  }
};

const UserModel = model("users", userSchema);
export default UserModel;
