const express = require("express");
const {
  fetchUserLanguage,
  fetchAllLanguages,
  updateUserLanguageController,
} = require("../controllers/userLanguageController");

const router = express.Router();

router.get("/user/:userId/language", fetchUserLanguage); // Get user's selected language
router.get("/languages", fetchAllLanguages); // Get all available languages
router.put("/user/:userId/language", updateUserLanguageController); // Update user's language by name

module.exports = router;

