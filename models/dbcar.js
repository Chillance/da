
/*
var restful = require('node-restful');
var mongoose = restful.mongoose;

var carSchema = new mongoose.Schema({
  carplate: String,
  color: String
});

module.exports = restful.model('Cars', carSchema);
*/


var mongoose = require('mongoose');

//var PCRE = require('pcre').PCRE;
//var re = new PCRE("[0-9a-f]{24}");
//var mongoDBIDRegex = new Regex(/[0-9a-f]{24}/);

//var Color = require("color")
var Schema = mongoose.Schema;

var DBCar = function() {
  this.carSchema = new Schema({
    carplate: {
      type: String,
      required: true,
      unique: true
    },
    color: {
      type: String,
    },
    /*
    color: {
      type: Object,
      ref: 'Color'
    },
    */
    year: {
      type: Number,
    },
  });
  this.carModel = mongoose.model('Cars', this.carSchema);
}

// getQueryByID is helping to support both standard MongoDB ID and the carplate as unique ID.
DBCar.prototype.getQueryByID = function(id) {
  var q;
  if (id != null && id.length === 24) { // Use regex for better control.
    q = this.carModel.findById(id);
  } else {
    q = this.carModel.findOne({ "carplate": id });
  }

  return q;
};

module.exports = DBCar
