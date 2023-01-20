const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { User } = require('../../models/User');

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

module.exports = router;