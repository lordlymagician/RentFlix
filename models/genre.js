const mongoose= require('mongoose');
const Joi=require('joi');

//genre schema
const genreSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50 
    }
});

//genre schema model
const Genre= mongoose.model('genres', genreSchema);

function validateGenre(genre) // ?check if res can be used in a function
{
    const schema={
        name: Joi.string().min(5).max(50).required()
    };
    return Joi.validate(genre,schema);
}

exports.Genre= Genre;
exports.genreSchema= genreSchema;
exports.validate= validateGenre;