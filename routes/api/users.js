const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const { User } = require('../../models/User');

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
], async (req, res) => {
    const errors = validationResult(req);

    const { name, email, password } = req.body;

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({ where: {email: email} });

        if(user) {
            return res.status(400).json({errors: [{ msg: 'User already exists' }]});
        }
        
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        user = new User({ 
            name, 
            email, 
            avatar,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

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


module.exports = router;