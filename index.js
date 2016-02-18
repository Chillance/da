
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
//var Gson = require('gson')
//var jsonFile = require('json-file-plus');
//var Color = require("color")

var app = express();

app.set('port', process.env.PORT || 8080);
app.use(bodyParser.json())
app.use(require('express-method-override')('method_override_param_name'));

mongoose.connect('mongodb://127.0.0.1/strossle');

var Car = require('./models/dbcar')
var car = new Car();

/*
var c1 = new Car("ABC-123", "blue", 1950);
var c2 = new Car("123-ABC", "black", 1910);
var c3 = new Car("123-ABC", "yellow", 1910);

var cars = [];

cars.push(c1);
cars.push(c2);
cars.push(c3);
*/

function queryParams(q, req) {
  if (req.query.filter) {
    var filters = req.query.filter.split(",");
    var orList = []
    for (var i = 0; i < filters.length; ++i) {
      var pair = filters[i].split("=");
      var obj = {};
      obj[pair[0]] = pair[1];
      orList.push(obj);
    }
    q.or(orList);
  }

  if (req.query.fields) {
    f = req.query.fields.split(',').join(" ");
    q.select(f);
  }

  if (req.query.offset) {
    q.skip(parseInt(req.query.offset));
  }

  if (req.query.limit) {
    q.limit(req.query.limit);
  }
}

function executeQueryWithJSONResponse(q, res) {
  if (q) {
    q.exec(function(err, car) {
      if (err) {
        console.log(err);
      }

      res.json(car);
    });
  }
}

// GET
app.get('/cars', function(req, res) {
  var q = car.carModel.find(req.body); // Also possible to filter using send data.

  queryParams(q, req);
  executeQueryWithJSONResponse(q, res);
});


app.get('/cars/:id', function(req, res) {
  var q = car.getQueryByID(req.params.id);

  queryParams(q, req);
  executeQueryWithJSONResponse(q, res);
});

// POST
app.post('/cars', function(req, res) {

  if (!req.body.carplate || req.body.carplate.length < 1) {
    res.status(400);
    res.json({
      message: 'carplate needs to be at least one character.',
    });
    return;
  }

  console.time("car_added"); // Just a simple timer test.
  var c = new car.carModel({
    carplate: req.body.carplate,
    //color: new Color(req.body.color),
    color: req.body.color,
    year: req.body.year,
  });

  c.save(function(err) {
    if (err) {
      console.log(err);
      res.status(400);
    }
    res.json({
      message: !err ? 'Car Added.' : "Car not added.",
    });
  }).then(function(){
    console.timeEnd("car_added");
  });
});

// PUT
app.put('/cars/:id', function(req, res) {
  var q = car.getQueryByID(req.params.id);

  q.exec(function(err, c) {
    if (err) {
      console.log(err);
      return;
    }

    if (c) {
      if (req.body.color && req.body.color.length > 0) {
        //car.color = new Color(req.body.color);
        c.color = req.body.color;
      }
      if (req.body.year) {
        c.year = parseInt(req.body.year);
      }

      c.save(function(err) {
        if (err) {
          console.log(err);
          res.status(400);
        }
        res.json({
          message: !err ? 'Car Updated.' : "Car not updated."
        });
      });

    } else {
      res.status(400);
      res.json({
        message: "Car doesn't exist."
      });
    }
  });
});

// DELETE
app.delete('/cars/:id', function(req, res) {

  var q = car.getQueryByID(req.params.id);

  q.exec(function(err, c) {
    if (err) {
      console.log(err);
      return;
    }

    if (c) {
      c.remove(function(err) {
        if (err) {
          console.log(err);
          res.status(400);
        }
        res.json({
          message: !err ? 'Car Removed.' : "Car not removed."
        });
      });
    } else {
      res.status(400);
      res.json({
        message: "Car doesn't exist."
      });
    }
  });
});


app.listen(app.get('port'), function() {
  console.log("Server listening on port " + app.get('port') + "...");
});
