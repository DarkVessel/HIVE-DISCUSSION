class UserInvite {
	constructor({
		name,
		usage = 0,
		max_usage = 1
	}) {
		if (!name) { return "no_name"; }
		return { name, usage, max_usage }
	}
}

module.exports = UserInvite;