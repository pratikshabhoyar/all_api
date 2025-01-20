const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userlistController');

// Define the route to get the user list
router.get('/users', UserController.getUserList);

module.exports=router;
