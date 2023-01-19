const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// start GET users
router.get('/', (req, res) => {
    res.send('User route');
});

// end GET user

// start POST users
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please use a valid email').isEmail(),
    check('password', 'Please enter a password with 8 or more characters').isLength({ min: 6 })
],(req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    res.send("User route");
});


module.exports = router;