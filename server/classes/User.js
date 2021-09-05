class User {
	constructor({
		name = "BEE " + Math.random().toString().split(".")[1],
		id,
		api_key = Math.random().toString(36).split(".")[1],
		discord_id = "none",
		avatar = "default",
		permissions = 0
	}) {
		if (!id) { return "no_id"; }
		return { unsafe: { id, api_key }, safe: { id, discord_id, name, avatar, permissions } }
	}
}

module.exports = User;