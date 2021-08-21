/* IMPORTS AND VARIABLES */
const express = require("express");
const api = express.Router();

// MiddleWare for parsing body to object (check req.body).
api.use(express.json({ limit: "100kb" }));
api.use(express.urlencoded({ limit: "100kb", extended: true }));

// MiddleWare for check session if needed.
api.post("/", (req, res, next) => {
	if (require(__globalname + "/db/config.json").api.require_api_key) {
		
	}
	next();
});
api.post("/accounts", (req, res) => {
		console.log(req.body)
	}
);

module.exports = api;