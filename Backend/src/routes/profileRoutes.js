const express = require("express");
const { updateProfile, getProfile, deleteProfile } = require("../controllers/profileController");
const authMiddleware = require("../middlewares/authMiddleware");
const { profileImage } = require("../middlewares/uploadMiddleware");
const router = express.Router();

/**
 * @description To update user profile
 * @api /api/profile/update
 * @access private
 * @type put
 * @return response
 */
router.put("/update", authMiddleware,profileImage.single('profilePic'), updateProfile);

/**
 * @description To  user get profile
 * @api /api/profile/get
 * @access private
 * @type get
 * @return response
 */

router.get("/get", authMiddleware, getProfile);


/**
 * @description To delete user profile
 * @api /api/profile/delete
 * @access private
 * @type delete
 * @return response
 */

router.delete("/delete", authMiddleware, deleteProfile);

module.exports = router;