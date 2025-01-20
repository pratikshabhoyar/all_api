const express = require('express');
const BookController = require('../controllers/booklistController');

const router = express.Router();

// Route to fetch Mandir list
router.get('/books', BookController.getBookList);

module.exports = router;