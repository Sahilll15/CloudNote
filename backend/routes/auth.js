const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'iamsahilchalke';
var fetchuser = require('../middleware/fetchuser')




//Create a user using post
//Router 1 -for creating an user
router.post('/createUser', [
    body('name').isLength({ min: 5 }).notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 7 }).withMessage('Password should have a minimum length of 7 characters')
        .matches(/\d/).withMessage('Password should contain at least one digit')
        .matches(/[A-Z]/).withMessage('Password should contain at least one uppercase letter')
        .matches(/[a-z]/).withMessage('Password should contain at least one lowercase letter')
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    const { name, email, password, Date } = req.body;
    let user = await User.findOne({ email: req.body.email })
    if (user) {


        return res.status(400).json({ success, errors: [{ msg: 'User already exists' }] });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, Date });
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        success = true
        res.status(200).json({ success, user: user, token });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the user.' });
    }
});




//route 2 for login an user
router.post('/login', [

    body('email').isEmail().withMessage('Invalid email'),
    body('password').exists().withMessage('password cannot be empty')

], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() })
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ "error": "incorrect credentials" })
        }

        const passwordcompare = await bcrypt.compare(password, user.password);
        if (!passwordcompare) {
            success = false
            return res.status(400).json({ success, "error": "incorrect credentials" })
        }

        const payload = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        success = true
        res.json({ success, token: token })
    } catch (err) {
        console.error(err)
        res.status(500).send('Internal server error');
    }

})

//get loged in user detail//login required
router.post('/getUser', [

    body('email').isEmail().withMessage('Invalid email'),
    body('password').exists().withMessage('password cannot be empty')

], fetchuser, async (req, res) => {
    try {
        var userId = req.user.id
        const user = await User.findById(userId).select('-password')
        res.json(user)
    } catch (error) {

        console.error(error)
        res.status(500).send('Internal server error');
    }

})




module.exports = router