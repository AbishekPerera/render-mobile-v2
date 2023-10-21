import express from "express";
const sitemanagerRouter = express.Router();
import bcrypt from "bcryptjs";
import SiteManager from "../models/sitemanager.js";
import jwt from "jsonwebtoken";

sitemanagerRouter.route("/").get((req, res) => {
  res.send("Site Manager Route Working!");
});

//add SiteManager to database
sitemanagerRouter.route("/add").post(async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const mobileNumber = req.body.mobileNumber;
  const nic = req.body.nic;
  const password = req.body.password;
  const hashPassword = await bcrypt.hash(password, 10);

  let existingUser;

  try {
    existingUser = await SiteManager.findOne({ email: email });

    if (existingUser) {
      return res
        .status(406)
        .json({ message: "User already exists! Login Instead" });
    } else {
      const newSiteManager = new SiteManager({
        name,
        email,
        mobileNumber,
        nic,
        password: hashPassword,
      });

      newSiteManager
        .save()
        .then(() => res.json("Site Manager added!"))
        .catch((err) => res.status(400).json("Error: " + err));
    }
  } catch (err) {
    console.log(err);
  }
});

//login SiteManager and return SiteManager details and jwt token
sitemanagerRouter.route("/login").post(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  let existingUser;

  try {
    existingUser = await SiteManager.findOne({ email: email });

    if (!existingUser) {
      return res.status(401).json({
        state: false,
        results: "Invalid Credentials",
      });
    } else {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!isPasswordCorrect) {
        return res.status(401).json({
          state: false,
          results: "Invalid Credentials",
        });
      } else {
        //generate jwt token
        const token = jwt.sign(
          { id: existingUser._id },
          process.env.JWT_SECREAT_KEY,
          {
            expiresIn: "7d",
          }
        );

        //return SiteManager details and jwt token
        res.status(200).json({
          // state: true,
          // results: "Order Added Successfully!",
          state: true,
          results: {
            id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            mobileNumber: existingUser.mobileNumber,
            nic: existingUser.nic,
            token,
          },
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

export default sitemanagerRouter;

// import mongoose from "mongoose";
// const Schema = mongoose.Schema;

// const siteManagerSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   mobileNumber: {
//     type: String,
//     required: true,
//   },
//   nic: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const SiteManager = model("SiteManager", siteManagerSchema);

// export default SiteManager;
