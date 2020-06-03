// USER AUTHENTICATION 

const {User}= require('../models/user');
const mongoose= require('mongoose');
const bcrypt= require('bcrypt');
const lodash= require('lodash');
const express= require('express'); 
const Joi=require('joi');
const router=express.Router();


router.post('/', async(req, res)=>{
    const {error}= validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //validate email
    let user= await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid Email or Password!');

    //vailidate password
    const validPassword= await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid Email or Password!');
    
    //generate token if login successful
    const token= user.generateAuthToken();
    res.send(token);
});


function validate(req){
    const schema={
        email: Joi.string().min(5).max(255).email().required(), //email() checks if its a valid email id
        password: Joi.string().min(5).max(255).required()
    };
    let result=Joi.validate(req, schema);
    return result;
}

module.exports= router;