const express = require('express');
const router = express.Router();

// start GET auth
router.get('/', (req, res) => {
    res.send('Auth route');
});

// end GET auth

module.exports = router;