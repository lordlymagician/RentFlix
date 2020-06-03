const {Customer, validate} = require('../models/customer')
const validateObjectId = require('../middleware/validateObjectId');
const auth= require('../middleware/auth');
const admin= require('../middleware/admin');
const mongoose= require('mongoose');
const express= require('express');

const router= express.Router();



//GET OR READ CUSTOMER
//get all customers
router. get('/', [auth, admin], async(req, res)=>{
    const customers= await Customer.find();
    res.send(customers);  
})

//get customer by id
router.get('/:id', [auth, admin, validateObjectId], async(req, res)=>{
    const customer= await Customer.findById(req.params.id);
    if(!customer) res.status(404).send('404 customer not found');
    else res.send(customer);
})

//POST OR CREATE CUSTOMER
router.post('/',[auth, admin], async(req, res)=>{
    const result= validate(req.body);
    if(result.error)
    {
        return  res.status(400).send(result.error.details[0].message);
    }

    let customer= new Customer({
        isGold: req.body.isGold, 
        name: req.body.name,
        phone: req.body.phone
    })
    customer= await customer.save();
    const customers= await Customer.find().sort('name');
    res.send(customer); 
})

//PUT OR UPDATE CUSTOMER
router.put('/:id',[auth, admin, validateObjectId], async(req, res)=>{
let result= validate(req.body);
    //validate
    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    }

    //find and update by id
    const customer= await Customer.findByIdAndUpdate(req.params.id, {
        isGold: req.body.isGold, 
        name: req.body.name,
        phone: req.body.phone},
        {new: true});

    //if customer not found
    if(!customer) return res.status(404).send('404 customer not found');

    //display
    const customers= await Customer.find().sort('name');
    res.send(customer);

})


//DELETE CUSTOMER
router.delete('/:id',[auth, admin, validateObjectId],  async(req, res)=>{
    const customer= await Customer.findByIdAndRemove(req.params.id);  
    if(!customer) return res.status(404).send('404 customer not found');

    //delete

    //view deleted
    const customers= await Customer.find().sort('name');
    res.send(customer);
})


module.exports=router;
