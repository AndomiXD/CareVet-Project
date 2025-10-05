const User = require("../models/User");

const getProfile = async (req, res) => {
	try {
		const userId = req.session?.userId || req.query.id;
		if (!userId) {
			res.send("User not logged in");
		}
		const user = await User.findById(userId);
		if (!user) {
			res.send("User not found");
		}
		res.render("profile", { user });
	} catch (err) {
		console.error("cannot get profile" + err);
	}
};

module.exports = {getProfile}