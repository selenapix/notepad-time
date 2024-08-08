const router = require('express').Router();
const path = require('path');

// Route for GET request
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});
// Route for GET request
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});

module.exports = router;