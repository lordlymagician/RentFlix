const {User, validate}= require('../models/user');
const auth= require('../middleware/auth');
const mongoose= require('mongoose');
const bcrypt= require('bcrypt');
const lodash= require('lodash');
const jwt= require('jsonwebtoken');
const config= require('config');
const express= require('express');

const router=express.Router();

router.get('/me', auth, async(req, res)=>{
    const user= await User.findById(req.user._id).select('-password');
    res.send(user);
});

router.post('/', async(req, res)=>{
    const {error}= validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message); 
    }

    let user= await User.findOne({email: req.body.email});
    if(user) return res.status(400).send('User already registered.');

    user= new User(
        // name: req.body.name,
        // email: req.body.email,
        // password: req.body.password
        lodash.pick(req.body, ['name', 'email', 'password'])
    );

    //hashing the password
    const salt= await bcrypt.genSalt(10);
    user.password= await bcrypt.hash(user.password, salt);     

    await user.save();
    // const users= await User.find().sort('name');

    const token= user.generateAuthToken();
    res.header('x-auth-token', token).send(lodash.pick(user, ['_id', 'name', 'email']));
});

module.exports= router;

