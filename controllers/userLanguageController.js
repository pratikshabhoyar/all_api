const { getUserLanguage, updateUserLanguageByName, getAllLanguages } = require("../models/userLanguageModel");

// Fetch User's Selected Language
const fetchUserLanguage = async (req, res) => {
  try {
    const { userId } = req.params;
    const language = await getUserLanguage(userId);

    if (!language) {
      return res.status(404).json({ message: "User language not found" });
    }

    res.status(200).json(language);
  } catch (error) {
    console.error("Error fetching user language:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Fetch All Available Languages
const fetchAllLanguages = async (req, res) => {
  try {
    const languages = await getAllLanguages();
    res.status(200).json(languages);
  } catch (error) {
    console.error("Error fetching languages:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update User's Selected Language by Name
const updateUserLanguageController = async (req, res) => {
  try {
    const { userId } = req.params;
    const { languageName } = req.body;

    if (!languageName) {
      return res.status(400).json({ message: "Language name is required" });
    }

    const affectedRows = await updateUserLanguageByName(userId, languageName);

    if (affectedRows === 0) {
      return res.status(404).json({ message: "User not found or language not updated" });
    }

    res.status(200).json({ message: "User language updated successfully", languageName });
  } catch (error) {
    console.error("Error updating user language:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  fetchUserLanguage,
  fetchAllLanguages,
  updateUserLanguageController,
};
