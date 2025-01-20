const express = require("express");
const {
  uploadAvatarImage,
  fetchAllAvatarImages,
  removeAvatarImage,
} = require("../controllers/avatarController");

const router = express.Router();

router.post("/", uploadAvatarImage); // Upload an image
router.get("/", fetchAllAvatarImages); // Fetch all images
router.delete("/:id", removeAvatarImage); // Delete an image by ID

module.exports = router;