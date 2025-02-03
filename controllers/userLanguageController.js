const { getUserLanguage, updateUserLanguageByName, getAllLanguages } = require("../models/userLanguageModel");

// Fetch User's Selected Language
// const fetchUserLanguage = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const language = await getUserLanguage(userId);

//     if (!language) {
//       return res.status(404).json({ message: "User language not found" });
//     }

//     res.status(200).json(language);
//   } catch (error) {
//     console.error("Error fetching user language:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// // Fetch All Available Languages
// const fetchAllLanguages = async (req, res) => {
//   try {
//     const languages = await getAllLanguages();
//     res.status(200).json(languages);
//   } catch (error) {
//     console.error("Error fetching languages:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// // Update User's Selected Language by Name
// const updateUserLanguageController = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { languageName } = req.body;

//     if (!languageName) {
//       return res.status(400).json({ message: "Language name is required" });
//     }

//     const affectedRows = await updateUserLanguageByName(userId, languageName);

//     if (affectedRows === 0) {
//       return res.status(404).json({ message: "User not found or language not updated" });
//     }

//     res.status(200).json({ message: "User language updated successfully", languageName });
//   } catch (error) {
//     console.error("Error updating user language:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
// Fetch User Language
const fetchUserLanguage = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Validate userId
    if (!userId) {
      return res.status(400).json({ error: true, message: "User ID is required" });
    }

    const language = await getUserLanguage(userId);

    if (!language) {
      return res.status(404).json({ error: true, message: "User language not found" });
    }

    res.status(200).json({
      error: false,
      language: language
    });
  } catch (error) {
    console.error("Error fetching user language:", error);
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
      details: error.message
    });
  }
};

// Fetch All Available Languages
const fetchAllLanguages = async (req, res) => {
  try {
    const languages = await getAllLanguages();

    if (!languages || languages.length === 0) {
      return res.status(404).json({ error: true, message: "No languages available" });
    }

    res.status(200).json({
      error: false,
      languages: languages
    });
  } catch (error) {
    console.error("Error fetching languages:", error);
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
      details: error.message
    });
  }
};

// Update User's Selected Language by Name
// const updateUserLanguageController = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { languageName } = req.body;

//     if (!userId) {
//       return res.status(400).json({ error: true, message: "User ID is required" });
//     }

//     if (!languageName) {
//       return res.status(400).json({ error: true, message: "Language name is required" });
//     }

//     // Validate if the language exists in the database
//     const languageExists = await checkIfLanguageExists(languageName);

//     if (!languageExists) {
//       return res.status(404).json({ error: true, message: `Language "${languageName}" not found` });
//     }

//     const affectedRows = await updateUserLanguageByName(userId, languageName);

//     if (affectedRows === 0) {
//       return res.status(404).json({ error: true, message: "User not found or language not updated" });
//     }

//     res.status(200).json({
//       error: false,
//       message: "User language updated successfully",
//       languageName
//     });
//   } catch (error) {
//     console.error("Error updating user language:", error);
//     res.status(500).json({
//       error: true,
//       message: "Internal Server Error",
//       details: error.message
//     });
//   }
// };
const updateUserLanguageController = async (req, res) => {
  try {
    const { userId } = req.params;
    const { languageName } = req.body;

    if (!userId) {
      return res.status(400).json({ error: true, message: "User ID is required" });
    }

    if (!languageName) {
      return res.status(400).json({ error: true, message: "Language name is required" });
    }

    // Check if the language exists in the database
    const allLanguages = await getAllLanguages();
    const languageExists = allLanguages.includes(languageName);

    if (!languageExists) {
      return res.status(404).json({ error: true, message: `Language "${languageName}" not found` });
    }

    const affectedRows = await updateUserLanguageByName(userId, languageName);

    if (affectedRows === 0) {
      return res.status(404).json({ error: true, message: "User not found or language not updated" });
    }

    res.status(200).json({
      error: false,
      message: "User language updated successfully",
      languageName
    });
  } catch (error) {
    console.error("Error updating user language:", error);
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
      details: error.message
    });
  }
};

module.exports = {
  fetchUserLanguage,
  fetchAllLanguages,
  updateUserLanguageController,
};
