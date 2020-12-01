'use strict';

var mysqlConnection = require('./../../config/db.config');
console.log(mysqlConnection)

//Movie object create
var Movie = function(movie){
  this.src = movie.Src;
  this.description = movie.Description;
  this.name = movie.Name;
  this.price = movie.Price;
  this.category = movie.Category;
};

Movie.create = function (newMovie, result) {
mysqlConnection.query("INSERT INTO movie set ?", newMovie, function (err, res) {
if(err) {
  console.log("error: ", err);
  result(err, null);
}
else{
  console.log(res.insertId);
  result(null, res.insertId);
}
});
};

Movie.findById = function (MovieID, result) {
mysqlConnection.query("Select * from movie where MovieID = ? ", MovieID, function (err, res) {
if(err) {
  console.log("error: ", err);
  result(err, null);
}
else{
  result(null, res);
}
});
};

Movie.findAll = function (result) {
  mysqlConnection.query("Select * from movie", function (err, res) {
  if(err) {
    console.log("error: ", err);
    result(null, err);
  }
  else{
    console.log('movies : ', res);
    result(null, res);
  }
  });
};

Movie.update = function(MovieID, movie, result){
  mysqlConnection.query("UPDATE movie SET Src = ?,  Description = ?, Name = ?, Price =?, Category = ? WHERE MovieID = ?", [movie.src, movie.description, movie.name, movie.price, movie.category, MovieID], function (err, res) {
  if(err) {
    console.log("error: ", err);
    result(null, err);
  }else{
    result(null, res);
  }
});
};

Movie.delete = function(MovieID, result){
mysqlConnection.query("DELETE FROM movie WHERE MovieID = ?", [MovieID], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  result(null, res);
}
});
};

module.exports= Movie;