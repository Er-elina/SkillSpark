const Profile = require("../models/userProfileModel");
const dotenv = require("dotenv");
dotenv.config();
const domain = process.env.DOMAIN;
// controller for updating user profile

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; //get user id from token
    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      return res.status(404).json({ msg: "profile not found" });
    }
    const { firstName, phone, address } = req.body;
    const prfofileData = {
      firstName: firstName ? firstName : profile.firstName,
      phone: phone ? phone : profile.phone,
      address: address ? address : profile.address,
    };
    if (req.file) {
      console.log(req.file);
      prfofileData.profilePic = `uploads/profiles/${req.file.filename}`;
    }
    const updatedProfile = await Profile.updateOne(
      { user: userId },
      {$set:prfofileData}
    );

    return res
      .status(200)
      .json({ msg: "profile updated successfully", profile });
  } catch (err) {
    // console.log(err);
    return res.status(500).json({ msg: "server error", error: err.message });
  }
};

// controller to get user profile
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await Profile.findOne({ user: userId }).populate("user", [
      "name",
      "email",
      "userRole",
    ]);
    if (!profile) {
      return res.status(404).json({ msg: "profile not found" });
    }
    return res
      .status(200)
      .json({ msg: "profile fetched successfully", profile });
  } catch (err) {
    return res.status(500).json({ msg: "server error", error: err.message });
  }
};

// controller to delete user profile

const deleteProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await Profile.findOneAndDelete({ user: userId });
    if (!profile) {
      return res.status(404).json({ msg: "profile not found" });
    }
    return res.status(200).json({ msg: "profile deleted successfully" });
  } catch (err) {
    return res.status(500).json({ msg: "server error", error: err.message });
  }
};

module.exports = { updateProfile, getProfile, deleteProfile };