const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const user = require("../models/user");

const usersGet = async (req = request, res = response) => {
	const { limit = 5, from = 0 } = req.query;
	// query params
	const query = { state: true };
	const [total, users] = await Promise.all([
		User.countDocuments(query),
		User.find(query).skip(Number(from)).limit(Number(limit)),
	]);

	res.json({
		total,
		users,
	});
};

const usersPost = async (req = request, res = response) => {
	const { name, email, password, role } = req.body;
	const user = new User({ name, email, password, role });

	const salt = bcryptjs.genSaltSync(10);
	user.password = bcryptjs.hashSync(password);

	await user.save();

	res.status(201).json({
		user,
	});
};

const usersPut = async (req = request, res = response) => {
	const { id } = req.params;
	const { _id, password, google, email, ...rest } = req.body;
	if (password) {
		const salt = bcryptjs.genSaltSync();
		rest.password = bcryptjs.hashSync(password);
	}
	const user = await User.findByIdAndUpdate(id, rest, { new: true });
	res.json({
		user,
	});
};

const usersPatch = (req = request, res = response) => {
	res.json({
		msg: "patch API",
	});
};

const usersDelete = async (req = request, res = response) => {
	const { id } = req.params;
	const authenticatedUser = req.user;

	// physically delete from database
	// const user = await User.findByIdAndDelete(id);

	const user = await User.findByIdAndUpdate(id, { state: false });

	res.json(user);
};

module.exports = {
	usersGet,
	usersPost,
	usersPut,
	usersPatch,
	usersDelete,
};
