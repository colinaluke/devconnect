const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const {Profile} = require('../../models/Profile')
const {User} = require('../../models/User')
// start GET profile
router.get('/me', auth, async (req, res) => {
    console.log(req.user.id)
    try {
        const profile = await Profile.findOne({where: { userId: req.user.id }, include: [ { model: User, as: 'user', attributes: ['name', 'avatar']}]});

        if(!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user.' });
        }

        res.json(profile);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// end GET profule

module.exports = router;