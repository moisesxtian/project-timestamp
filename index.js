// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
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

// Helper function to validate and parse the date
function parseDate(dateString) {
  // Check if the input is a valid date
  const date = new Date(dateString);
  if (date.toString() === "Invalid Date") {
    return null; // return null if the date is invalid
  }
  return date;
}

// API endpoint for date conversion
app.get("/api/:date?", function (req, res) {
  let dateParam = req.params.date;

  // If the date param is empty, use the current date and time
  if (!dateParam) {
    const currentDate = new Date();
    return res.json({
      unix: currentDate.getTime(),
      utc: currentDate.toUTCString()
    });
  }

  // If the date is in milliseconds (Unix timestamp), treat it as such
  let parsedDate = parseDate(dateParam);
  if (!parsedDate) {
    parsedDate = parseDate(parseInt(dateParam, 10)); // try converting it to a timestamp
  }

  // If parsing failed, return error message
  if (!parsedDate) {
    return res.json({ error: "Invalid Date" });
  }

  // Return the unix and UTC values
  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
