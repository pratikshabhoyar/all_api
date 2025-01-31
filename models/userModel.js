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
  const [rows] = await pool.execute("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0];
};

// Update notification setting by ID
const updateNotificationSetting = async (id, notifications_enabled) => {
  const [result] = await pool.execute(
    "UPDATE users SET notifications_enabled = ? WHERE id = ?",
    [notifications_enabled, id]
  );
  return result;
};

///////////////////////////////////////
// Fetch selected mandir IDs for a user
// const getSelectedMandirsByUserId = async (userId) => {
//   const [rows] = await pool.execute("SELECT selected_mandirs FROM users WHERE id = ?", [userId]);
//   if (!rows.length || !rows[0]?.selected_mandirs) {
//     return []; // Return an empty array if no data
//   }

//   try {
//     return JSON.parse(rows[0].selected_mandirs) || [];
//   } catch (error) {
//     console.error("Error parsing selected_mandirs:", error);
//     return []; // Return an empty array in case of invalid JSON
//   }
// };

// // Update selected mandir IDs for a user
// const updateSelectedMandirsByUserId = async (userId, mandirIds) => {
//   const serializedMandirs = JSON.stringify(mandirIds);
//   const [result] = await pool.execute(
//     "UPDATE users SET selected_mandirs = ? WHERE id = ?",
//     [serializedMandirs, userId]
//   );
//   return result;
// };

// // Fetch mandir details from the Mandir table by mandir IDs
// const getMandirDetails = async (mandirIds) => {
//   if (!Array.isArray(mandirIds) || mandirIds.length === 0) {
//     return []; // Return an empty array if input is invalid
//   }
//   const placeholders = mandirIds.map(() => "?").join(",");
//   const [rows] = await pool.execute(SELECT * FROM mandir WHERE id IN (${placeholders}), mandirIds);
//   return rows;
// };


const getSelectedMandirsByUserId = async (userId) => {
  try {
    const [rows] = await pool.execute("SELECT selected_mandirs FROM users WHERE id = ?", [userId]);

    if (!rows.length) {
      return { error: true, message: "User not found." };
    }

    if (!rows[0]?.selected_mandirs) {
      return { error: true, message: "No mandirs selected for this user." };
    }

    try {
      const mandirIds = JSON.parse(rows[0].selected_mandirs);
      if (!Array.isArray(mandirIds) || mandirIds.length === 0) {
        return { error: true, message: "No valid mandir IDs found." };
      }
      return { error: false, mandirIds };
    } catch (error) {
      console.error("Error parsing selected_mandirs:", error);
      return { error: true, message: "Invalid stored data format." };
    }
  } catch (error) {
    console.error("Database error fetching selected mandirs:", error);
    return { error: true, message: "Database error." };
  }
};

// Update selected mandir IDs for a user
const updateSelectedMandirsByUserId = async (userId, mandirIds) => {
  try {
    const serializedMandirs = JSON.stringify(mandirIds);
    const [result] = await pool.execute(
      "UPDATE users SET selected_mandirs = ? WHERE id = ?",
      [serializedMandirs, userId]
    );

    if (result.affectedRows === 0) {
      return { error: true, message: "User not found or no update made." };
    }

    return { error: false, message: "Selected mandirs updated successfully." };
  } catch (error) {
    console.error("Error updating selected mandirs:", error);
    return { error: true, message: "Database error while updating mandirs." };
  }
};

// Fetch mandir details from the Mandir table by mandir IDs
const getMandirDetails = async (mandirIds) => {
  if (!Array.isArray(mandirIds) || mandirIds.length === 0) {
    return { error: true, message: "Invalid mandir ID list provided." };
  }

  try {
    const placeholders = mandirIds.map(() => "?").join(",");
    const [rows] = await pool.execute(`SELECT * FROM mandir WHERE id IN (${placeholders})`, mandirIds);

    if (rows.length === 0) {
      return { error: true, message: "No valid mandirs found for the given IDs." };
    }

    return { error: false, mandirs: rows };
  } catch (error) {
    console.error("Database error fetching mandir details:", error);
    return { error: true, message: "Database error while fetching mandirs." };
  }
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

