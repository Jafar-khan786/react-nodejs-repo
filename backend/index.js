var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
const my_CONFIG = require('./config/const__.json');
const con = require('./config/connection');
const routes = require('./routes');
var app = express();
 const port = my_CONFIG.port ||4300;
app.use(cors());

app.use(bodyParser.json());
 

app.get('/', function (req, res, ) {
   return res.json({msg: 'This is Home Page'});
})
 
app.use("/api/",routes);


app.listen(port, function () {
  console.log('CORS-enabled web server listening on port'+port);
})