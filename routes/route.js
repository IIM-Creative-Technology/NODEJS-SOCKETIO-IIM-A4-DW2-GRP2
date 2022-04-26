var express = require("express");
var app = express();

//Répond Hello World! sur la page d’accueil :
app.get("/", function (req, res) {
  res.send("Hello World!");
});
