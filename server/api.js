// Imports database.
const Mouse = require("mouse-db.json");
const users = {
	//unsafe: new Mouse({ fileName: __dirname + "/db/users/unsafe.json" }),
	//safe: new Mouse({ fileName: __dirname + "./db/users/safe.json" }),
	invite: new Mouse({ fileName: "/db/users/invite.json" })
}
const projects = new Mouse("projects", { fileName: "./mouse.json" });
// Setup api Router.
const express = require("express");
const api = express.Router();
// Imports and define data for for work.
const global_path = __dirname.split("/").slice(0, __dirname.split("/").length - 1).join("/");
const permissions = require("./src/permissions.js");
const Project = require("./classes/Project.js");
const User = require("./classes/User.js");
const UserInvite = require("./classes/UserInvite.js");

console.log(users.invite);
console.log(users.safe)
console.log(users.unsafe)
throw 0;

// MiddleWare for parsing body to object (check req.body).
api.use(express.json({ limit: "100kb" }));
api.use(express.urlencoded({ limit: "100kb", extended: true }));

// Creates new user by invite  and sends created user.unsafe and user.safe.
api.post("/users/new/i/:id", (req, res) => {
	if (typeof(req.body.options) != "object" ) { req.body.options = {} }
	if (Array.isArray(req.body.options)) { req.body.options = {} }
	if (users.safe.get().find((v) => { return v.id == req.params.id; })) { return res.send("[\"error\",5,\"" + req.params.id +"\"]"); }
	req.body.options.id = req.params.id;
	const user = new User(req.body.options);
	users.unsafe.push(user.unsafe);
	users.safe.push(user.safe);
	res.send(JSON.stringify(user));
});

// MiddleWare for check api_key and request type.
api.use((req, res, next) => {
	if (req.method != "POST") { return res.send("[\"error\",3,\"" + req.method +"\"]"); }
	const user_id = users.unsafe.get().find((v) => { return v.api_key == req.body.api_key })?.id;
	if (!user_id) { return res.send("[\"error\",0]"); }
	req.user = users.safe.get().find((v) => { return v.id == user_id; });
	next();
});



// Sends users.safe.
api.post("/users", (req, res) => { res.send(JSON.stringify(users.safe.get())); });
// Sends user from users.safe that doing requests.
api.post("/users/this", (req, res) => { res.send(req.user); });
// Sends user from users.safe by id.
api.post("/users/get/:id", (req, res) => {
	const user = users.safe.get().find((v) => { return v.id == req.params.id; });
	if (!user) { return res.send("[\"error\",2,\"" + req.params.id +"\"]"); }
	res.send(JSON.stringify(user));
});
// Creates new user and sends created user.unsafe and user.safe.
api.post("/users/new/:id", (req, res) => {
	if (!(req.user.permissions & permissions.users.new)) { return res.send("[\"error\",1,\"" + permissions.users.new +"\"]"); }
	if (users.safe.get().find((v) => { return v.id == req.params.id; })) { return res.send("[\"error\",5,\"" + req.params.id +"\"]"); }
	if (typeof(req.body.options) != "object" ) { req.body.options = {} }
	if (Array.isArray(req.body.options)) { req.body.options = {} }
	req.body.options.id = req.params.id;
	const user = new User(req.body.options);
	users.unsafe.push(user.unsafe);
	users.safe.push(user.safe);
	res.send(JSON.stringify(user));
});
// Sets user by id.
api.post("/users/set/:id", (req, res) => {
	if (req.user.permissions & permissions.users.set) {
		// something
		return console.log("y");
	}
	res.send("[\"error\",1,\"" + permissions.users.set +"\"]");
});
// Deletes user by id.
api.post("/users/del/:id", (req, res) => {
	if (req.user.permissions & permissions.users.del) {
		const user = users.safe.get().find((v) => { return v.id == req.params.id; });
		if (user) {
			// DELETE ACTIONS HERE
			return res.send(1);
		}
		return res.send("[\"error\",2,\"" + req.params.id +"\"]");
	}
	res.send("[\"error\",1,\"" + permissions.users.del +"\"]");
});



// Makes a new user invite.
api.post("/users/invite/new/:name", (req, res) => {
	if (!(req.user.permissions & permissions.users.invite.new)) { return res.send("[\"error\",1,\"" + permissions.users.invite.new +"\"]"); }
	if (users.invite.get()[req.params.name]) { return res.send("\"error\",7,\"" + req.params.name + "\"]"); }
	if (typeof(req.body.options) != "object" ) { req.body.options = {} }
	if (Array.isArray(req.body.options)) { req.body.options = {} }
	req.body.options.name = req.params.name;
	const user_invite = new UserInvite(req.body.options);
	// save here
	res.send(user_invite);
});



// Sends projects.
api.post("/projects", (req, res) => { res.send(JSON.stringify(projects.get())); });
// Sends project by id.
api.post("/projects/:id", (req, res) => {
	if (projects.get().indexOf(req.params.id) != -1) {
		return res.send(1);
		// something
	}
	res.send("[\"error\",4,\"" + req.params.id + "\"]");
});

module.exports = api;