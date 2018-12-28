//jshint esversion:6

//require node packages Express and BodyParser
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");


//create app on server
const app = express();

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

//tells app generated using express to use ejs as its view engine:
app.set("view engine", "ejs");

//set up bodyParser:
app.use(bodyParser.urlencoded({
  extended: true
}));

//explicitly tell express to serve up static pages:
app.use(express.static("public"));

//create instructions for when server receives a GET request from the home route:
app.get("/", function(req, res) {

const day = date.getDate();

  /*
      var currentDay = today.getDay();
      var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      var todayDayofWeek = daysOfWeek[currentDay];
  */


  //add console.log for error tracking:
  //console.log("Error: current day is equal to: " + currentDay);


  res.render("list", {
    listTitle: day,
    newListItems: items
  });

});


app.post("/", function(req, res) {

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});


//Create routing for the Work route:
app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});


//Create routing for the About page:
app.get("/about", function(req,res){
  res.render("about");
});







/*
turn on the server on a specified port. Create a message so that you can tell
at the command line that server is running successfully
*/
app.listen(3000, function() {
  console.log("Server is listening at port 3000");
});
