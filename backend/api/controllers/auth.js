import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    // Hashing password with bcryt
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    await newUser.save();
    res.status(200).send("User has been created ");
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    // check the Hashing password with bcryt
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "user not correct"));
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "worng password or username !"));
    const { password, isAdmin, ...otherDetails } = user._doc;
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
    
  } catch (error) {
    next(error);
  }
};
