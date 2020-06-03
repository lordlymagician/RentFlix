const express= require('express');
const router=express.Router();

//home page
router.get('/', async(req,res)=>{ 
    await res.send('welcome to RentFlix..');
})

module.exports=router;