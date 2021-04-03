const Role = require("../models/role");
const User = require("../models/user");

const itIsValidRole = async (role = "") => {
	const roleExists = await Role.findOne({ role });
	if (!roleExists)
		throw new Error(`The role ${role} is not registered in the database`);
};

const emailExists = async (email = "") => {
	const exists = await User.findOne({ email });
	if (exists)
    throw new Error(`The email ${email} is already registered`);
};

const userExistsById = async (id = '') => {
  const userExists = await User.findById(id);
  if(!userExists) 
    throw new Error(`The id ${id} does not exist`)
};

module.exports = {
	itIsValidRole,
  emailExists,
  userExistsById, 
};
