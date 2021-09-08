module.exports = {
	users: {
		new:           0b000001,
		set:           0b000010,
		del:           0b000100,
		invite: { new: 0b001000,
			del:         0b010000,
			view:        0b100000
		}
	}
}