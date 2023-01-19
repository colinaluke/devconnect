const express = require('express');
const router = express.Router();

// start GET profule
router.get('/', (req, res) => {
    res.send('Profile route');
});

// end GET profule

module.exports = router;