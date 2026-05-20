// import express from 'express';
// import userModel from "../models/userModel"

// CJS Format
// import { Router } from "express";
// const express = require("express")
// const router=express.Router();
// const UserModel=require("../models/userModel").default

// router.post("/signup",UserModel.signup);

// module.exports= router;

//ES format
import { Router } from "express";
const router = Router();
// import UserModel from "../models/userModel.js";

import {
  signup,
  loginWithCredentials,
  authMiddleware,
  loginWithCookie,
  addFriend,
  removeFriend,
  generateResetCode,
  resetPwd,
  logout,
} from "../controllers/userController.js";

router.post("/signup", signup);
router.post("/login", loginWithCredentials);
router.patch("/addFriend", authMiddleware, addFriend);
router.patch("/removeFriend", authMiddleware, removeFriend);

router.get("/login", authMiddleware, loginWithCookie);
router.patch("/generateQR", generateResetCode);
router.patch("/resetPwd", resetPwd);
router.get("/logout",logout)

// router.all('/*',()=>{})
router.all("/{*any}", (req, res) => {
  console.log(req.method, req.path);
  res.status(404);
  res.send("Invalid API Endpoint please handle.");
});

export default router;
