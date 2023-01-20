const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const {Profile} = require('../../models/Profile')
const {Social} = require('../../models/Social')
const {Experience} = require('../../models/Experience')
const {User} = require('../../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

// start GET profile
router.get('/me', auth, async (req, res) => {
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

router.get('/', async (req, res) => {
    try{
        const profiles = await Profile.findAll({include: [ { model: User, as: 'user', attributes: ['name', 'avatar']}]});
        res.json(profiles); 
    } catch(err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

router.get('/user/:user_id', async(req, res) => {
    try{
        const profile = await Profile.findOne({ where: { userId: req.params.user_id }, include: [ { model: User, as: 'user', attributes: ['name', 'avatar']}]});
        if(!profile) {
            return res.status(400).json({ msg: 'Profile not found'});
        }
        res.json(profile); 
    } catch(err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});
// end GET profile

// start POST profile
router.post('/', [auth, [
    check('status', 'Status is required.').not().isEmpty(),
    check('skills', 'Skills is required.').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        company,
        website,
        location, 
        bio, 
        status, 
        githubusername, 
        skills, 
        youtube, 
        facebook, 
        twitter, 
        instagram, 
        linkedin
    } = req.body;

    const profileFields = {}
    if(company) profileFields.company = company
    if(website) profileFields.website = website
    if(location) profileFields.location = location
    if(bio) profileFields.bio = bio
    if(status) profileFields.status = status
    if(githubusername) profileFields.githubusername = githubusername
    if(skills) profileFields.skills = skills.replace(/\s+/g, '');
    profileFields.userId = req.user.id

    const socialFields = {}
    if(youtube) socialFields.youtube = youtube
    if(facebook) socialFields.facebook = facebook
    if(twitter) socialFields.twitter = twitter
    if(instagram) socialFields.instagram = instagram
    if(linkedin) socialFields.linkedin = linkedin

    try {
        let profile = await Profile.findOne({ where: { userId : req.user.id} });

        if(profile) {
            profile.update(profileFields, { where: { userId: req.user.id, returning: true, upsert: true } });
        } else {
            profile = new Profile(profileFields);
            await profile.save();
        }

        let socials = await Social.findOne({ where: { profileId : profile.id} });

        if(socials) {
            socials.update(socialFields, { where: { profileId:  profile.id, returning: true, upsert: true } });
        } else {
            socialFields.profileId = profile.id
            socials = new Social(socialFields);
            await socials.save();
        }

        res.json({profile, socials});
    } catch(err) {
        console.error(err.message)
        return res.status(500).json({ msg: 'Server error' });
    }
});
// end POST profile

// start UPDATE profile
router.put('/experience', [auth, [
    check('title', 'Title is required.').not().isEmpty(),
    check('company', 'Company is required.').not().isEmpty(),
    check('from', 'From date is required.').not().isEmpty(),
]], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        title, 
        company, 
        location, 
        from, 
        to, 
        current,
        description
    } = req.body;

    const newExp = {
        title: title,
        company: company, 
        location: location, 
        from: from, 
        to: to,
        current: current,
        description: description
    }

    try {
        const profile = await Profile.findOne({ where: { userId: req.user.id }});
        newExp.profileId = profile.id;

        let experience = await Experience.findOne({ where: { profileId : profile.id} });

        if(experience) {
            experience.update(newExp, { where: { profileId:  profile.id, returning: true, upsert: true } });
        } else {
            experience = new Experience(newExp);
            await experience.save();
        }

        res.json({profile, experience});
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
// end UPDATE profile

// start DELETE profile
router.delete('/', auth, async(req, res) => {
    try{
        await Profile.destroy({ where: {userId: req.user.id }});
        await User.destroy({ where: {id: req.user.id }});

        res.json({ msg: "User removed."});
    }catch(err) {
        console.error(err.message)
        return res.status(500).json({ msg: 'Server error' }); 
    }
})
// end DELETE profile
module.exports = router;