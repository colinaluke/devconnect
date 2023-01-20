const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator');

const {Profile} = require('../../models/Profile')
const {Post} = require('../../models/Post')
const {User} = require('../../models/User')
const {Like} = require('../../models/Like')
const {Comment} = require('../../models/Comment')

// start GET posts
router.get('/', auth, async (req, res) => {
    try{
        const posts = await Post.findAll({ order: [ ['date', 'DESC'] ] });
        res.json(posts); 
    } catch(err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

router.get('/:id', auth, async (req, res) => {
    try{
        const post = await Post.findByPk(req.params.id);
        if(!post) {
            return res.status(404).json({ msg: "Post not found"});
        }
        res.json(post); 
    } catch(err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
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

router.post('/like/:id', auth, async(req, res) => {
    try {
        let like = await Like.findOne({ where: { postId: req.params.id, userId: req.user.id }});
        if(like) {
            return res.status(400).json({ msg: 'Post is already liked.'})
        }

        like = new Like({
            userId: req.user.id,
            postId: parseInt(req.params.id)
        });

        await like.save();
        res.json(like)
    } catch (err) {
        console.error(err.message)
        return res.status(500).json({ msg: 'Server error' });
    }
});

router.post('/comment/:id', [auth,[
    check('text', 'Text is required').not().isEmpty()
]], async(req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id, }, attributes: {exclude: ['password']}});

        const comment = new Comment({
            userId: req.user.id, 
            text: req.body.text,
            name: user.name, 
            avatar: user.avatar,
            postId: req.params.id
        });

        await comment.save();
        res.json(comment)
    } catch (err) {
        console.error(err.message)
        return res.status(500).json({ msg: 'Server error' });
    }
});
// end POST

// start DELETE
router.delete('/:id', auth, async(req, res) => {
    try{
        const post = await Post.findByPk(req.params.id)
        if(!post) {
            return res.status(404).json({ msg: "Post not found"});
        }
        if(post.userId !== req.user.id) {
            return res.status(401).json({ msg: "User not authorized"});
        } else {
            await Post.destroy({ where: {id: req.params.id }});
            res.json({ msg: "Post removed."});
        }
    }catch(err) {
        console.error(err.message)
        return res.status(500).json({ msg: 'Server error' }); 
    }
})

router.delete('/unlike/:id', auth, async(req, res) => {
    try{
        const like = await Like.findOne({where: {postId: req.params.id }})
        if(!like) {
            return res.status(404).json({ msg: "Post is not liked"});
        }
        if(like.userId !== req.user.id) {
            return res.status(401).json({ msg: "User not authorized"});
        } else {
            await Like.destroy({ where: {postId: req.params.id }});
            res.json({ msg: "Post unliked."});
        }
    }catch(err) {
        console.error(err.message)
        return res.status(500).json({ msg: 'Server error' }); 
    }
})

router.delete('/comment/:post_id/:comment_id', auth, async(req, res) => {
    try{
        const comment = await Comment.findOne({ where: {postId: req.params.post_id, id: req.params.comment_id}})

        if(!comment) {
            return res.status(404).json({ msg: "Comment does not exist"});
        }

        if(comment.userId !== req.user.id) {
            return res.status(401).json({ msg: "User not authorized"});
        } else {
            await Comment.destroy({ where: {id: req.params.comment_id }});
            res.json({ msg: "Comment removed."});
        }
    }catch(err) {
        console.error(err.message)
        return res.status(500).json({ msg: 'Server error' }); 
    }
})
// end DELETE

module.exports = router;