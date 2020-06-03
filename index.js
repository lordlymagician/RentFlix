const express=require('express');
const winston= require('winston');
const router=express();
const chalk= require('chalk')

require('./startup/logging')();
require('./startup/routes')(router);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();



const port=process.env.PORT || 3000;
const server= router.listen(port, ()=>winston.info(chalk.yellow(`listening on port ${port}...`)));

module.exports= server;