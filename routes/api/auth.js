const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { User } = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

// start GET auth
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id, }, attributes: {exclude: ['password']}});
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
// end GET auth

// start POST auth
router.post('/', [
    check('email', 'Please use a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);

    const { email, password } = req.body;

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({ where: {email: email} });

        if(!user) {
            return res.status(400).json({errors: [{ msg: 'Invalid credentials' }]});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({errors: [{ msg: 'Invalid credentials' }]});
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload, 
            process.env.JWT_SECRET, 
            { expiresIn: 3600},
            (err, token) => {
                if(err) throw err 
                res.json( { token} );
            }    
        );
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});
// End POST auth

module.exports = router;