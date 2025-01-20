const Mandir = require('../models/offlinemandirlistModel');

// Fetch mandirs with status offline
const getOfflineMandirList = (req, res) => {
    Mandir.getOfflineMandirs((err, mandirs) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch mandir list' });
      }
      res.status(200).json(mandirs);
    });
  };
  
  module.exports = { getOfflineMandirList };