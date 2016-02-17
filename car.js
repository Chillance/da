
var Car = function(carplate, color, year) {
    this.carplate = carplate;
    this.color = color;
    this.year = year;
}

Car.prototype.getID = function () {
    return this.carplate;
};

module.exports = Car
