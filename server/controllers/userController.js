import { verifyPass, genPwdHash } from "../utils/passwordUtil.js";
// import UserModel from "./../models/userModel"
import UserModel from "./../models/userModel.js";
import responseHandler from "../utils/responseHandler.js";
const { errorCreator, responseCreator } = responseHandler;
import { generateToken, verifyToken } from "../utils/jwtUtil.js";
import { generateQRCode, verifyOTP } from "../utils/totpUtil.js";
// const { errorCreator, responseCreator}=require("../utils/responseHandler")

const signup = async (req, res, next) => {
  try {
    const userData = req.body;
    userData.password = await genPwdHash(userData.password);
    // console.log(userData);
    const data = await UserModel.createUser(userData);
    // console.log(data);
    if (data) {
      res.status(201);
      res.send(responseCreator(`user ${userData.username} Signup successfully, Please Login..`));
    }
  } catch (error) {
    next(error);
    // console.log(error);
    // res.status(500);
    // res.send({ success: false, msg: error.message });
  }
};

const loginWithCredentials = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const { password: pwdHash, ...userData } =
      await UserModel.getUser(username);
    // if () {
    // user exist , match pwd now
    if (await verifyPass(password, pwdHash)) {
      const token = generateToken(userData);
      res.cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
      console.log(token);

      res.status(200);
      res.send(responseCreator(`${username} logged in successfully`, userData));
      // res.send({
      //   success: true,
      //   msg: `${username} logged in success`,
      //   data: userData,
      // });
    } else {
      errorCreator("Incorrect Pwd!!!", 401);
      // const err = new Error("Incorrect Pwd!!!");
      // err.status = 401;
      // throw err;
    }
    // }
    // else {
    //   const err = new Error("User doesn't exist!!!");
    //   err.status = 404;
    //   throw err;
    // }
  } catch (error) {
    next(error);
    // console.log(error);
    // res.status(error.status || 500);
    // res.send({ success: false, msg: error.message });
  }
};

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const data = verifyToken(token);
    const { password, ...userData } = await UserModel.getUser(data.username);
    if (userData) {
      res.locals.userData = userData;
      next();
    }
  } catch (error) {
    // next(error);
    errorCreator("Invalid Token")
    
  }
};
const loginWithCookie = async (req, res, next) => {
  try {
    res.send(
      responseCreator("User authenticate with cookie", res.locals.userData),
    );
  } catch (error) {
    next(error);
    // console.log(error);
    // res.status(error.status || 500);
    // res.send({ success: false, msg: error.message });
  }
};

const addFriend = async (req, res, next) => {
  try {
    const { username } = res.locals.userData;
    const { id, name } = req.body;

    const data = await UserModel.updateFriend(username, id);
    if (data) {
      res.status(200);
      res.send(responseCreator(`You are now friend with ${name}`,data.friendList));
    }
    // else {
    //   const err = new Error("Something went wrong!!!");
    //   err.status = 500;
    //   throw err;
    // }
  } catch (error) {
    next(error);
    // console.log(error);
    // res.status(error.status || 500);
    // res.send({ success: false, msg: error.message });
  }
};
const removeFriend = async (req, res, next) => {
  try {
    const { username } = res.locals.userData;
    const { id, name } = req.body;

    const data = await UserModel.updateFriend(username, id, false);
    if (data) {
      res.status(200);
      res.send(responseCreator(`You are no longer friend with ${name}`,data.friendList));
    }
    // else {
    //   const err = new Error("Something went wrong!!!");
    //   err.status = 500;
    //   throw err;
    // }
  } catch (error) {
    next(error);
    // console.log(error);
    // res.status(error.status || 500);
    // res.send({ success: false, msg: error.message });
  }
};

const generateResetCode = async (req, res, next) => {
  try {
    const { data, secret } = await generateQRCode();
    const { username } = req.body ;
    const userUpdated = await UserModel.updateUser(username, { secret });
    if (userUpdated) {
      res.send(`<h1>Two Factor Authentication Setup</h1>
        <h2>Please Scan the QR Code With Google Authenticater</h2>
        <img src="${data}"/>
        `);
    }
  } catch (error) {
    next(error);
  }
};

const resetPwd = async (req, res, next) => {
  try {
    const { username, password:pwd, token } = req.body;
    const user = await UserModel.getUser(username);
    const { secret } = user;
    const password=await genPwdHash(pwd);
    const isOTPValid = verifyOTP(token, secret);
    if (isOTPValid) {
      const userUpdated = await UserModel.updateUser(username, { password });
      if (userUpdated) {
        res.send(
          responseCreator(`Password Updated Successfully for ${username}`),
        );
      } else {
        errorCreator("Something went wrong!!!");
      }
    } else {
      errorCreator("Invalid OTP", 403);
    }
  } catch (error) {
    next(error);
  }
};

const logout = async(req,res,next)=>{
  res.clearCookie("token");
  res.send(responseCreator("user logged out successfully!!!"))
}

export {
  loginWithCredentials,
  authMiddleware,
  loginWithCookie,
  signup,
  addFriend,
  removeFriend,
  generateResetCode,
  resetPwd,
  logout
};
