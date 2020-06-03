const {Movie, validate} = require('../models/movie');
const {Genre} = require('../models/genre');
const auth= require('../middleware/auth');
const admin= require('../middleware/admin');
const mongoose= require('mongoose');
const express= require('express');

const router= express.Router();


//GET OR READ MOVIES
//get all movies
router.get('/', async(req, res)=>{
    const movies= await Movie.find().sort('name');
    res.send(movies);  
})

//get movie by id
router.get('/:id', async(req, res)=>{
    const movie= await Movie.findById(req.params.id);
    if(!movie) return res.status(404).send('404 movie not found');
    else res.send(movie);
})

//POST OR CREATE MOVIE
router.post('/', [auth, admin], async(req, res)=>{
    const result= validate(req.body);
    if(result.error)
    {
        res.status(400).send(result.error.details[0].message);
        return;
   }

   const genre= await Genre.findById(req.body.genreId);
   if(!genre) res.status(404).send('404 genre not found');

    const movie= new Movie({
        title: req.body.title, 
        genre:{
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })
    await movie.save();
    const movies= await Movie.find().sort('title');
    res.send(movies); 
})

//PUT OR UPDATE MOVIE
router.put('/:id', [auth, admin], async(req, res)=>{
let result= validate(req.body);

const genre= await Genre.findById(req.body.genreId);
   if(!genre) res.status(404).send('404 genre not found');
   
    //find and update by id
    const movie= await Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title, 
        genre:{
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate},
        {new: true});
    //if movie not found
    if(!movie) res.status(404).send('404 movie not found');

    //validate
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    //display
    const movies= await Movie.find().sort('name');
    res.send(movies);

})


//DELETE MOVIES
router.delete('/:id', [auth, admin], async(req, res)=>{
    let movie= await Movie.findByIdAndDelete(req.params.id);  
    if(!movie) res.status(404).send('404 movie not found');

    //delete

    //view deleted
    const movies= await Movie.find().sort('title');
    res.send(movies);
})


module.exports=router;
