const express = require('express');
const Sequelize = require('sequelize');
const router = express.Router();
const auth = require('../../middleware/auth')
const {Profile} = require('../../models/Profile')
const {Social} = require('../../models/Social')
const {Experience} = require('../../models/Experience')
const {Education} = require('../../models/Education')
const {User} = require('../../models/User')
const {Post} = require('../../models/Post')
const request = require('request');
const { check, validationResult } = require('express-validator');

// start GET profile
router.get('/me', auth, async (req, res) => {
    try {
        let profile = await Profile.findOne({
            where: { userId: req.user.id }, 
            include: [ 
                { model: User, as: 'user', attributes: ['name', 'avatar']}, 
                { model: Social, as: 'social', 
                    where: { profileId: Sequelize.col('profile.id')},
                    attributes: ['youtube', 'twitter', 'facebook', 'linkedin', 'instagram'],
                    required: false
                },
                { model: Experience, as: 'experience', 
                    where: { profileId: Sequelize.col('profile.id')},
                    required: false
                },
                { model: Education, as: 'education', 
                    where: { profileId: Sequelize.col('profile.id')},
                    required: false
                }
            ]
        });
        
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

router.get('/github/:username', async(req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GIT_CLIENT_ID}&client_secret=${process.env.GIT_CLIENT_SECRET}`,
            method: "GET",
            headers: { 'user-agent': 'node.js' }
        }

        request(options, (error, response, body) => {
            if(error) {
                console.error(error);
            }
            if(response.statusCode !== 200) {
                return res.status(404).json({ msg: 'No Github profile found'})
            }
            res.json(JSON.parse(body))
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
})
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

        let experience = await Experience.findOne({ where: { profileId : profile.id, title: title, company: company, from: from} });

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

router.put('/education', [auth, [
    check('school', 'School is required.').not().isEmpty(),
    check('degree', 'Degree is required.').not().isEmpty(),
    check('fieldofstudy', 'Field of study is required.').not().isEmpty(),
    check('from', 'From date is required.').not().isEmpty(),
]], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        school, 
        degree, 
        fieldofstudy, 
        from, 
        to, 
        current,
        description
    } = req.body;

    const newEdu = {
        school: school,
        degree: degree, 
        fieldofstudy: fieldofstudy, 
        from: from, 
        to: to,
        current: current,
        description: description
    }

    try {
        const profile = await Profile.findOne({ where: { userId: req.user.id }});
        newEdu.profileId = profile.id;

        let education = await Education.findOne({ where: { profileId : profile.id, school: school, degree: degree, fieldofstudy: fieldofstudy, from: from} });

        if(education) {
            education.update(newEdu, { where: { profileId:  profile.id, returning: true, upsert: true } });
        } else {
            education = new Education(newEdu);
            await education.save();
        }

        res.json({profile, education});
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
// end UPDATE profile

// start DELETE profile
router.delete('/', auth, async(req, res) => {
    try{
        await Post.destroy({
            where: {userId: req.user.id}
        })

        await Profile.destroy({ 
            where: {userId: req.user.id },
            include: [{
                model: Social,
                as: 'social',
                where: { profileId: Sequelize.col('profile.id') }
            }]
        });
        await User.destroy({ where: {id: req.user.id }});

        res.json({ msg: "User removed."});
    }catch(err) {
        console.error(err.message)
        return res.status(500).json({ msg: 'Server error' }); 
    }
})

router.delete('/experience/:exp_id', auth, async(req, res) => {
    try {
        const exp = await Experience.findOne({ where: {id:req.params.exp_id}});
        if(exp) {
            await Experience.destroy({ where: { id: req.params.exp_id }});
        } else {
            return res.status(400).json({ msg: 'Experience is not found.'});
        }
        res.json(exp);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.delete('/education/:edu_id', auth, async(req, res) => {
    try {
        const edu = await Education.findOne({ where: {id:req.params.edu_id}});
        if(edu) {
            await Education.destroy({ where: { id: req.params.edu_id }});
        } else {
            return res.status(400).json({ msg: 'Education is not found.'});
        }
        res.json(edu);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
// end DELETE profile
module.exports = router;