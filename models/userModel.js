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
// // Update selected mandirs for a user
// const updateSelectedMandirs = (userId, selectedMandirs) => {
//   return new Promise((resolve, reject) => {
//     const query = `UPDATE users SET selected_mandirs = ? WHERE id = ?`;
//     pool.query(query, [selectedMandirs.join(','), userId], (err, result) => {
//       if (err) return reject(err);
//       resolve(result);
//     });
//   });
// };

// // Fetch selected mandirs for a user
// const getSelectedMandirsByUserId = (userId) => {
//   return new Promise((resolve, reject) => {
//     const query = `
//       SELECT m.id, m.title, m.location
//       FROM users u
//       JOIN mandir m ON FIND_IN_SET(m.id, u.selected_mandirs)
//       WHERE u.id = ?;
//     `;
//     pool.query(query, [userId], (err, results) => {
//       if (err) return reject(err);
//       resolve(results);
//     });
//   });
// };


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
  // updateSelectedMandirs, getSelectedMandirsByUserId,
  updateUser
  
};

