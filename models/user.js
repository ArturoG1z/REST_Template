/**
 *? {
 *?   name: 'fdasfdad',
 *?   email: 'dfad@dsfasdf.com',
 *?   password: 'kj;fdf;afdjfda',
 *?   img: 'dsf;aljkf;afjkd',
 *?   role: 'dfa;sfjklaf',
 *?   state: false,
 *?   google: true
 *? }
 */

const { Schema, model } = require("mongoose");

const UserSchema = Schema({
	name: {
		type: String,
		required: [true, "The name is required"],
	},
	email: {
		type: String,
		required: [true, "The email is required"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "The password is required"],
	},
	img: {
		type: String,
	},
	role: {
		type: String,
		required: [true, "The role is required"],
		enum: ["admin", "user"],
	},
	state: { // exists = true or is deleted = false
		type: Boolean,
		default: true,
	},
	google: {
		type: Boolean,
		default: false,
	},
});

UserSchema.methods.toJSON = function(params) {
	const { __v, password, _id, ...user} = this.toObject();
	user.uid = _id;
	return user;
}

module.exports = model("User", UserSchema);
