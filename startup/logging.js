// require('winston-mongodb');
const winston= require('winston');
require('express-async-errors');

module.exports= function () {

        // HANDLING UNCAUGHT EXCEPTION
    winston.handleExceptions(
        new winston.transports.Console({colourize: true, prettyPrint: true}), //for platform independent logging
        new winston.transports.File({ filename: 'uncaughtExceptions.log'})
    )

        // HANDLING UNHANDLED REJECTION
    process.on('unhandledRejection', (ex)=>{
        throw ex;
    });  

    winston.add(winston.transports.File, {filename: 'logfile.log'});// winston stores error in file
    // winston.add(winston.transports.MongoDB, {
    //     db: 'mongodb://localhost/vidly',
    //     level: 'info'
    // }); //winston stores error in mongodb
}