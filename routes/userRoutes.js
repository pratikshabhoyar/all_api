const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  updateUserStatus,
  getUsersCount,updateUser
} = require("../controllers/userController");

router.get("/", getAllUsers);
router.patch("/:id/status", updateUserStatus);
router.get("/count", getUsersCount);
// PUT route to update user details by ID
router.put("/users/:id", updateUser);

module.exports = router;
