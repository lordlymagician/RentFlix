const mongoose= require('mongoose');
const winston= require('winston');
const config= require('config');
const chalk= require('chalk');


module.exports= function() {
    //connecting to mongodb
    const db= config.get('db');
    mongoose.set('useCreateIndex', true);
    mongoose.connect(db)
        .then(()=> winston.info(chalk.green(`connected to ${db}...`))) //(green colour code, message)        
}
