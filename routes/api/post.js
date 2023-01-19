const express = require('express');
const router = express.Router();

// start GET posts
router.get('/', (req, res) => {
    res.send('Post route');
});

// end GET posts


module.exports = router;