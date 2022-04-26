const path = require('path');
const express = require('express');
const router = express.Router();

//Répond Hello World! sur la page d’accueil :
router.get("/", function (req, res) {
  res.send("Hello World!");
});

//Répond 'Got a POST request' avec une méthode POST sur la route racine (/)
router.post("/", function (req, res) {
  res.send("Got a POST request");
});

// Socket test
router.get('/socket-test', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/socket-test.html'));
})

module.exports = router;
