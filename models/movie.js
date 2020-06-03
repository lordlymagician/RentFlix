const mongoose= require('mongoose');
const Joi= require('joi');
const {genreSchema}= require('./genre');

//schema
const movieSchema= new mongoose.Schema({
    title:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        trim: true
    },

    genre:{
        type: genreSchema,
        required: true,
        },

    numberInStock:{
        type: Number,
        required: true,
        min: 0,
        max: 255},

    dailyRentalRate:{
        type: Number,
        required: true,
        min: 0,
        max: 255}
});

//model
const Movie= mongoose.model('movies', movieSchema);

function validateMovie(movie) // ?check if res can be used in a function
{
    const schema={
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    };
    return Joi.validate(movie, schema);
     
}

exports.Movie= Movie;
exports.validate= validateMovie;