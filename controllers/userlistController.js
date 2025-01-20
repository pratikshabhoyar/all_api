const User = require('../models/userlistModel');

// Fetch all users
const UserController = {
    // Fetch and return the Mandir list
    getUserList: (req, res) => {
        User.getAllUsers((err, results) => {
            if (err) {
                console.error('Error fetching user list:', err);
                res.status(500).json({ error: 'Failed to fetch user list' });
            } else {
                res.json(results);
            }
        });
    },
};

module.exports=UserController;

