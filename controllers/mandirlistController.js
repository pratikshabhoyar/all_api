const Mandir = require('../models/mandirlistModel');

const MandirController = {
    // Fetch and return the Mandir list
    getMandirList: (req, res) => {
        Mandir.getAllMandirs((err, results) => {
            if (err) {
                console.error('Error fetching Mandir list:', err);
                res.status(500).json({ error: 'Failed to fetch Mandir list' });
            } else {
                res.json(results);
            }
        });
    },
};

module.exports=MandirController;

