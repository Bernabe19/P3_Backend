require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
const dns = require('dns');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

var cadena;
var num = 0;
app.post('/api/shorturl', function(req,res){
  num = Math.floor(Math.random() * 1000);
  cadena = req.body.url;
  let correct = true;
  dns.lookup(cadena,function(err){
    if(err) correct = false;
  });

  if(correct == null || correct == false){
    res.json({error:"Invalid url"});
  }else{
    res.json({"original_url":cadena,"short_url":num});
  }

  
});
app.get('/api/shorturl/:short_url', function(req, res) {
  var ruta = req.headers.short_url;
  if(ruta == num){
    res.redirect({cadena});
  }
 
});



app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
