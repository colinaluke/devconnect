const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator');

const {Profile} = require('../../models/Profile')
const {Post} = require('../../models/Post')
const {User} = require('../../models/User')

// start GET posts
router.get('/', (req, res) => {
    res.send('Post route');
});

// end GET posts

// start POST
router.post('/', [auth, [
    check('text', 'Text is required.').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const user = await User.findOne({ where: { id: req.user.id, }, attributes: {exclude: ['password']}});
        const newPost = {
            text : req.body.text,
            name : user.name, 
            avatar: user.avatar, 
            userId: req.user.id
        }
        
        const post = new Post(newPost);
        await post.save();
        res.json(post);
    } catch (err) {
        console.error(err.message)
        return res.status(500).json({ msg: 'Server error' });
    }


});
// end POST

module.exports = router;