const userModel = require("../models/userModel"); // Import model
const pool = require("../config/db");
// const getAllUsers = async (req, res) => {
//   try {
//     const user = await userModel.getAllUsers();
//     res.status(200).json(user);
//   } catch (err) {
//     console.error("Error fetching user:", err);
//     res.status(500).json({ error: "Failed to fetch users." });
//   }
// };
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();

    // If no users found, return a meaningful response
    if (!users || users.length === 0) {
      return res.status(404).json({
        error: true,
        message: "No users found.",
      });
    }

    res.status(200).json({
      error: false,
      message: "Users retrieved successfully.",
      total_users: users.length,
      users,
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({
      error: true,
      message: "Internal Server Error. Unable to fetch users.",
    });
  }
};



const updateUserStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const result = await userModel.updateUserStatus(id, status);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Status updated successfully." });
    } else {
      res.status(404).json({ error: "User not found." });
    }
  } catch (err) {
    console.error("Error updating user status:", err);
    res.status(500).json({ error: "Failed to update status." });
  }
};

const getUsersCount = async (req, res) => {
  try {
    const count = await userModel.getUsersCount(); // Call the newly added function
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching user count:", error);
    res.status(500).json({ error: "Failed to fetch user count." });
  }
};



const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, country, gender, age, country_code, mobile_number } = req.body;

  if (!id) {
    return res.status(400).json({ error: true, message: "User ID is required" });
  }

  // Validate the required fields
  if (!name || !email || !country || !gender || !age || !country_code || !mobile_number) {
    return res.status(400).json({ error: true, message: "All fields are required" });
  }

  try {
    // Update query
    const query = `
      UPDATE users 
      SET 
        name = ?, 
        email = ?, 
        country = ?, 
        gender = ?, 
        age = ?, 
        country_code = ?, 
        mobile_number = ? 
      WHERE id = ?
    `;

    const values = [name, email, country, gender, age, country_code, mobile_number, id];

    const result = await userModel.updateUser(query, values);  // Use the async function

    if (result.affectedRows === 0) {
      return res.status(404).json({error: true, message: "User not found or no changes made" });
    }

    // Fetch updated user details to return as response (optional)
    const [updatedUser] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);

    res.status(200).json({
      error: false,
      message: "User updated successfully",
      updatedUser: updatedUser[0], // Return updated user details
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

// ////////////////////////////////
// // Update selected mandirs for a user
// const updateSelectedMandirs = (userId, selectedMandirs) => {
//   return new Promise((resolve, reject) => {
//     const query = `UPDATE users SET selected_mandirs = ? WHERE id = ?`;
//     db.query(query, [selectedMandirs.join(','), userId], (err, result) => {
//       if (err) return reject(err);
//       resolve(result);
//     });
//   });
// };

// // Fetch selected mandirs for a user
// const getSelectedMandirsByUserId = (userId) => {
//   return new Promise((resolve, reject) => {
//     const query = `
//       SELECT m.id, m.title, m.description, m.images
//       FROM users u
//       JOIN mandir m ON FIND_IN_SET(m.id, u.selected_mandirs)
//       WHERE u.id = ?;
//     `;
//     db.query(query, [userId], (err, results) => {
//       if (err) return reject(err);
//       resolve(results);
//     });
//   });
// };




module.exports = {
  getAllUsers,
  updateUserStatus,
  getUsersCount,
  updateUser,
  /////////////
  //updateSelectedMandirs, getSelectedMandirsByUserId,
};
