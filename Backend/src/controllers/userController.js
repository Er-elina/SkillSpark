// controller for user registration

const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Profile = require("../models/userProfileModel");
dotenv.config();

const userRegister = async (req, res) => {
  try {
    // console.log(req.body);
    const data = req.body;
    const email = data.email;
    // console.log(data);
    // console.log(data.name);
    // const name=req.body.name;

    if (!data.email || !data.password) {
      return res.status(400).json({ msg: "Please enter email or password" });
    }
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const newUser = new User({
      name: data.name,
      email: data.email,
      password: data.password,
      userRole: data.userRole,
    });

    const newProfile = new Profile({
      user: newUser._id,
    });

    const response = await newUser.save();
    const profileResponse = await newProfile.save();
    return res
      .status(201)
      .json({
        msg: "User registered successfully",
        user: response,
        profile: profileResponse,
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server error", error: err });
  }
};

// controller for user login
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  // const data=req.body;
  // const email=data.email;
  // const password=data.password;
  try {
    let user = await User.findOne({ email: email });
    console.log(user);

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
 
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          msg: "user logged in successfully",
          token: `${token}`,
          user: user,
        });
      }
    );
  } catch (error) {
    return res.status(400).json({ msg: "Unable to login", error });
  }
};

module.exports = { userRegister, userLogin };