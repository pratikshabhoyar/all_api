const express = require("express");
const router = express.Router();
const {
  addMandir,
  updateMandir,
  deleteMandir,
  getAllMandirs,
  getMandirById,
  updateMandirStatus,
  getMandirCount,
  ////////////
  getSelectedMandirs,
  updateSelectedMandirs,
} = require("../controllers/mandirController");

// Route to get all Mandirs
router.get("/", getAllMandirs);

router.get("/count", getMandirCount);

// Route to get a Mandir by ID
router.get("/:id", getMandirById);

// Route to add Mandir
router.post("/", addMandir);

// Route to update Mandir
router.put("/:id", updateMandir);

// Route to delete Mandir
router.delete("/:id", deleteMandir);

router.patch("/:id/status", updateMandirStatus);

//
// ////////////////////////
// Route to get selected mandirs for a user
router.get("/users/:userId/mandirs", getSelectedMandirs);

// Route to update selected mandirs for a user
router.patch("/users/:userId/mandirs", updateSelectedMandirs);




module.exports = router;
