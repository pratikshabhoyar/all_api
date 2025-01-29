const db = require("../config/db");

// Fetch User's Selected Language
const getUserLanguage = async (userId) => {
  try {
    const [rows] = await db.execute(
      "SELECT u.id AS user_id, l.id AS language_id, l.name AS language_name FROM users u LEFT JOIN language l ON u.language_id = l.id WHERE u.id = ?",
      [userId]
    );
    return rows.length ? rows[0] : null;
  } catch (error) {
    throw error;
  }
};

// Fetch All Available Languages
const getAllLanguages = async () => {
  try {
    const [rows] = await db.execute("SELECT id, name FROM language");
    return rows;
  } catch (error) {
    throw error;
  }
};

// Update User's Selected Language by Name
const updateUserLanguageByName = async (userId, languageName) => {
  try {
    // ✅ Fetch the language ID using the provided language name
    const [languageRows] = await db.execute("SELECT id FROM language WHERE name = ?", [languageName]);

    if (languageRows.length === 0) {
      return 0; // ❌ Language name not found
    }

    const languageId = languageRows[0].id;

    // ✅ Update user's language in the users table
    const [result] = await db.execute("UPDATE users SET language_id = ? WHERE id = ?", [languageId, userId]);

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
