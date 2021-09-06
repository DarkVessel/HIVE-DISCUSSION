const db = require("mouse-db.json");

const express = require("express");
const app = express();

// Imports api Router.
app.use("/api", require(__dirname + "/api.js"));
// Users avatars.
app.use("/avatars", express.static(__dirname + "/src/avatars"));


app.listen(81)
/*
curl -X POST http://localhost:81/api/users/new/lol -H 'Cache-Control: no-cache' -H 'Content-Type: application/json' -d '{

}'
*/