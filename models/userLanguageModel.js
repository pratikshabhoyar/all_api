const db = require("../config/db");

// // Fetch User's Selected Language
// const getUserLanguage = async (userId) => {
//   try {
//     const [rows] = await db.execute(
//       "SELECT id AS user_id, language_name FROM users WHERE id = ?",
//       [userId]
//     );
//     return rows.length ? rows[0] : null;
//   } catch (error) {
//     throw error;
//   }
// };
// Fetch User's Selected Language
const getUserLanguage = async (userId) => {
  try {
    const [rows] = await db.execute(
      "SELECT id AS user_id, language_name FROM users WHERE id = ?",
      [userId]
    );

    // If no language is selected, return 'English' by default
    if (rows.length === 0 || !rows[0].language_name) {
      return { user_id: userId, language_name: "English" };
    }

    return rows[0]; // Return the selected language if available
  } catch (error) {
    throw error;
  }
};


// Fetch All Available Languages
const getAllLanguages = async () => {
  try {
    const [rows] = await db.execute("SELECT name FROM language");
    return rows.map(row => row.name); // Return an array of language names
  } catch (error) {
    throw error;
  }
};

// Update User's Selected Language by Name
const updateUserLanguageByName = async (userId, languageName) => {
  try {
    // Check if the language exists in the language table
    const [languageRows] = await db.execute("SELECT name FROM language WHERE name = ?", [languageName]);

    if (languageRows.length === 0) {
      return 0; // Language name not found
    }

    // Update the user's language in the `users` table
    const [result] = await db.execute("UPDATE users SET language_name = ? WHERE id = ?", [languageName, userId]);

    return result.affectedRows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUserLanguage,
  getAllLanguages,
  updateUserLanguageByName,
};
