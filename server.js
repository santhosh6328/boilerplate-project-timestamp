// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { json, request, response } = require('express');
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

app.get("/api/timestamp", (req, res) => {
  let date = Date.now()
  GMTdate = new Date(date);
  let result = {
    "unix": date,
    "utc": GMTdate.toGMTString()
  }
  res.send(result);
});

app.get("/api/timestamp/:date", (req, res) => {
  if(new Date(req.params.date).getTime() > 0) {
    var date = new Date(req.params.date.toString());
  }else if(new Date(+req.params.date)>0) {
    var date = new Date(+req.params.date);
  }else{
    res.send({error: "Invalid Date"})
  }
  let result = {
    "unix": date.getTime(),
    "utc": date.toGMTString()
  }
  console.log(result);
  res.send(result);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
