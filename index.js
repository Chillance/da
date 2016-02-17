
var Car = require('./car')

var express = require('express');
var app = express();

var c = new Car("ABC-123", "blue", 1950);

console.log(c);

app.get('/cars/:id', function (req, res) {
  console.log('Id:', req.params.id);
  //res.sendStatus(200);
  res.send(c);

});

app.listen(8080);
