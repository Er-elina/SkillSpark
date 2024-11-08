const mongoose = require("mongoose");
const schema = mongoose.Schema;
const userProfileSchema = new schema(
  {
    user: {
      type: schema.Types.ObjectId,
      ref: "User",
    },
    firstName: {
      type: String,
    },

    phone: {
      type: String,
    },
    address: {
      type: String,
    },

    profilePic: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const profile = mongoose.model("Profile", userProfileSchema);
module.exports = profile;