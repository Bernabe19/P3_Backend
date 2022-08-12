require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
let bodyParser = require("body-parser");
const isUrl = require('is-url');


// Basic Configuration
const port = process.env.PORT || 3000;
let count = 0;
const urls = {};



app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));

app.use('/public', express.static(`${process.cwd()}/public`));
app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/shorturl', function(req,res){
  var cadena = req.body.url;
  if(!isUrl(cadena)){
    res.json({error: "invalid url"});
    return;
  }
    count+=1;
    urls[count] = cadena;
    res.json({original_url : cadena,short_url : count});
});

app.get('/api/shorturl/:ur', function(req, res) {
  const short = req.params.ur;
  const url = urls[short];  
    res.redirect(url);
  
});




app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
