var express = require("express");
var app = express();

//Répond Hello World! sur la page d’accueil :
app.get("/", function (req, res) {
  res.send("Hello World!");
});

//Répond 'Got a POST request' avec une méthode POST sur la route racine (/)
app.post("/", function (req, res) {
  res.send("Got a POST request");
});
