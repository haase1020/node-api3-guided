const express = require('express'); // importing a CommonJS module
const morgan =require('morgan');
const helmet = require('helmet');//1:npm i helmet; 2 -require
const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

//global middleware
server.use(helmet());//3: server use//(configures headers in more secure way)
server.use(morgan('short')); //third party, needs to by npm installed

server.use(logger);//don't need to invoke
server.use(express.json()); //built-in middleware: no need to npm install

//after going through middleware, goes to routers
server.use('/api/hubs', hubsRouter);
server.use(addName);

//can add multiple middleware like addName and logger
server.get('/',addName, logger, (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  console.log("req.name is", req.name);
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

function addName(req,res,next) {
  //super secret sauce
  req.name="Web 27";
  next();
}
server.use(function(req,res,next) {
  res.status(404).json({message:'Oops, couldnt find what you needed'})
})
//the three Amigas
function logger(req, res, next){
  //log info about the request to the console -> GET to /
const method=req.method;
const endpoint =req.originalUrl;

console.log(`${method} to ${endpoint}`);
next();//move the request to the next middleware
}

module.exports = server;
