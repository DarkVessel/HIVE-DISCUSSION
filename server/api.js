/* IMPORTS AND VARIABLES */
const { table } = require("mouse-db.json");
const users = {
	unsafe: new table("users.unsafe"),
	safe: new table("users.safe")
}
const projects = new table("projects");

const express = require("express");
const api = express.Router();

const global_path = __dirname.split("/").slice(0, __dirname.split("/").length - 1).join("/");
const permissions = require("./src/permissions.js");



// MiddleWare for parsing body to object (check req.body).
api.use(express.json({ limit: "100kb" }));
api.use(express.urlencoded({ limit: "100kb", extended: true }));

// MiddleWare for check session if needed.
api.use((req, res, next) => {
	if (req.body.api_key) {
		const user_id = users.unsafe.get().find((v) => { return v.api_key == req.body.api_key })?.id;
		if (user_id) {
			req.user = users.safe.get().find((v) => { return v.id == user_id; });
			return next();
		}
	}
	return res.send("[\"error\",0]");
});



api.post("/users", (req, res) => { res.send(JSON.stringify(users.safe.get())); });
api.post("/users/get/:id", (req, res) => { res.send(JSON.stringify(users.safe.get().find((v) => { return v.id == req.params.id; }))); });
api.post("/users/set/:id", (req, res) => {
	console.log(req.user)
});
api.post("/users/new/:id", (req, res) => {
	
});
api.post("/users/del/:id", (req, res) => {
	
});

module.exports = api;