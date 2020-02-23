const express = require('express');
const cors = require('micro-cors');
const config = require('./config');
const server = express();

server.use(cors({ allowMethods: ['GET', 'PUT', 'POST', 'DELETE'] }));
server.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "no-cors");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
server.use(express.static('public'));

server.use((req, res, next) => {
    const token = req.get('Authorization')
  
    if (token) {
      req.token = token
      next()
    } else {
      res.status(403).send({
        error: 'Please provide an Authorization header to identify yourself (can be whatever you want)'
      })
    }
})

server.use(require('./router/contacts'));


server.listen(config.port, () => console.log('%s is listening on http://localhost:%s', config.name, config.port));