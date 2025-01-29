const express = require("express");
const {
  uploadAvatarImage,
  removeAvatarImage,
  fetchUserAvatar, 
  fetchAllAvatars, 
  updateUserAvatarController
} = require("../controllers/avatarController");

const router = express.Router();

router.post("/", uploadAvatarImage); // Upload an image

router.delete("/:id", removeAvatarImage); // Delete an image by ID
router.get("/user/:userId/avatar", fetchUserAvatar);  // Fetch User's Selected Avatar
router.get("/avatars", fetchAllAvatars);              // Fetch All Available Avatars
router.put("/user/:userId/avatar", updateUserAvatarController);  // Update User's Avatar


module.exports = router;