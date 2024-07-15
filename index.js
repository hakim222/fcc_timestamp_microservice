// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get("/api/:date", (req, res)=>{
  let dateParam = req.params.date;
  let date = new Date(dateParam);
  if (!isNaN(date.getTime())){
    let unixTime = date.getTime();
    let utcTime = date.toUTCString();
    res.json({"unix": unixTime, "utc": utcTime});
  }
  else if (!isNaN(parseInt(dateParam, 10))&&parseInt(dateParam, 10)>=0)
  {
    let utcTime = (new Date(parseInt(dateParam,10))).toUTCString();
    res.json({"unix": parseInt(dateParam, 10), "utc": utcTime});
  }
  else 
  {
    res.json({error: "Invalid Date"});
  }
})

app.get("/api/", (req,res)=>{
  let date = new Date();
  let unixTime = date.getTime();
  let utcTime = date.toUTCString();
  res.json({"unix": unixTime, "utc": utcTime});
})