const {Rental, validate}= require('../models/rental');
const {Customer}= require('../models/customer');
const {Movie}= require('../models/movie');
const mongoose= require('mongoose');
const auth= require('../middleware/auth');
const admin= require('../middleware/admin');
const fawn=require('fawn');
const express= require('express');


fawn.init(mongoose);
const router= express.Router();

//get 
router.get('/', [auth, admin], async(req, res)=>{
  const rentals= await Rental.find().sort('-dateOut');
  res.send(rentals);
});

//post
router.post('/', auth, async(req, res)=>{
  //validate Rental
  const result= validate(req.body);
  if(result.error){
    res.status(400).send(result.error.details[0].message);
    return;
  }

  //find customer by id
  const customer= await Customer.findById(req.body.customerId);
  if(!customer) res.status(400).send('invalid customer!');

  //find movie by id
  const movie= await Movie.findById(req.body.movieId);
  if(!movie) res.status(400).send('invalid movie!');

  //check if movie in stock
  if(movie.numberInStock===0) { res.send('movie out of stock!'); return; }
  
  //create a new rental
  let rental= new Rental({
    customer:{
      _id: customer._id,
      name: customer.name,
      isGold: customer.isGold,
      phone: customer.phone
    },
    
    movie:{
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  })

try{
  new fawn.Task()
    .save('rentals', rental)
    .update('movies', {_id: movie._id}, { $inc: { numberInStock: -1 }})
    .run();

  const rentals= await Rental.find().sort('-dateOut');
  res.send(rentals);
}

catch(ex){
  res.status(500).send('something failed..');
}

});

//get by id
router.get('/:id',[auth, admin], async(req, res)=>{
  const rental= await Rental.findById(req.params.id);
  if(!rental) return res.status(404).send('404 rental not found');

  res.send(rental);
});
//put
//delete

module.exports= router;
