const pool = require("../config/db");

const getAllUsers = async () => {
  const query = `SELECT * FROM users`;

  try {
    const [rows] = await pool.query(query);
    return rows.map((user) => ({
      ...user,
    }));
  } catch (err) {
    throw new Error("Failed to fetch users");
  }
};

const updateUserStatus = async (id, status) => {
  const query = `UPDATE users SET status = ? WHERE id = ?`;

  try {
    const [result] = await pool.query(query, [status, id]);
    return result;
  } catch (err) {
    throw new Error("Failed to update user status");
  }
};

const getUsersCount = async () => {
  const [rows] = await pool.query("SELECT COUNT(*) AS count FROM users");
  return rows[0].count;
};

// Fetch user by ID
const getUserById = async (id) => {
  const [rows] = await pool.execute("SELECT * FROM Users WHERE id = ?", [id]);
  return rows[0];
};

// Update notification setting by ID
const updateNotificationSetting = async (id, notifications_enabled) => {
  const [result] = await pool.execute(
    "UPDATE Users SET notifications_enabled = ? WHERE id = ?",
    [notifications_enabled, id]
  );
  return result;
};

///////////////////////////////////////
// Fetch selected mandir IDs for a user
const getSelectedMandirsByUserId = async (userId) => {
  const [rows] = await pool.execute("SELECT selected_mandirs FROM Users WHERE id = ?", [userId]);
  if (!rows.length || !rows[0]?.selected_mandirs) {
    return []; // Return an empty array if no data
  }

  try {
    return JSON.parse(rows[0].selected_mandirs) || [];
  } catch (error) {
    console.error("Error parsing selected_mandirs:", error);
    return []; // Return an empty array in case of invalid JSON
  }
};

// Update selected mandir IDs for a user
const updateSelectedMandirsByUserId = async (userId, mandirIds) => {
  const serializedMandirs = JSON.stringify(mandirIds);
  const [result] = await pool.execute(
    "UPDATE Users SET selected_mandirs = ? WHERE id = ?",
    [serializedMandirs, userId]
  );
  return result;
};

// Fetch mandir details from the Mandir table by mandir IDs
const getMandirDetails = async (mandirIds) => {
  if (!Array.isArray(mandirIds) || mandirIds.length === 0) {
    return []; // Return an empty array if input is invalid
  }
  const placeholders = mandirIds.map(() => "?").join(",");
  const [rows] = await pool.execute(`SELECT * FROM Mandir WHERE id IN (${placeholders})`, mandirIds);
  return rows;
};


///////////////
// Model function to update user
const updateUser = async (query, params) => {
  try {
    const [result] = await pool.query(query, params);
    return result;
  } catch (error) {
    throw error;  // Rethrow the error to be handled by the controller
  }
};


module.exports = {
  getAllUsers,
  updateUserStatus,
  getUsersCount,
  getUserById,
  updateNotificationSetting,
  ////
  getSelectedMandirsByUserId,
  updateSelectedMandirsByUserId,
  getMandirDetails,
  ///
  updateUser
  
};

