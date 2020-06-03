const express= require('express');

const home=require('../routes/home');
const genres= require('../routes/genres');
const customers= require('../routes/customers');
const movies= require('../routes/movies');
const rentals= require('../routes/rentals');
const users= require('../routes/users');
const auth= require('../routes/auth');
const returns= require('../routes/returns');
const error= require('../middleware/error');


module.exports= function(router) {
    //calling routes
    router.use(express.json());// for post requests
    router.use('/home', home);
    router.use('/api/genres', genres);
    router.use('/api/customers', customers);
    router.use('/api/movies', movies);
    router.use('/api/rentals', rentals);
    router.use('/api/users', users);
    router.use('/api/auth', auth);
    router.use('/api/returns', returns);
    router.use(error);
}