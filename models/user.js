const mongoose= require('mongoose');
const Joi= require('joi');
const jwt= require('jsonwebtoken');
const config =require('config');



const userSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        trim: true
    },
    
    email:{
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },

    password:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },

    isAdmin: Boolean
});


userSchema.methods.generateAuthToken= function() {
    const token= jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));    //const token= jwt.sign({ payload }, 'private key'); 
    return token;
}

const User= mongoose.model('users', userSchema);

function validateUser(user){
    const schema={
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).email().required(), //email() checks if its a valid email id
        password: Joi.string().min(5).max(255).required()
        };
    let result=Joi.validate(user, schema);
    return result;
}

exports.User= User;
exports.validate= validateUser;
