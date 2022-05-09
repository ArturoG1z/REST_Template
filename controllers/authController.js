const { response, request } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const { generateJWT } = require("../helpers/generateJWT");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
	const { email, password } = req.body;
	try {
		// verify if email exists
		const user = await User.findOne({ email });
		if (!user)
			return res.status(401).json({
				msg: "Incorrect user / Password - email",
			});

		if (!user.state)
			return res.status(401).json({
				msg: "Incorrect user / Password - state false",
			});
		const validPassword = bcryptjs.compareSync(password, user.password);
		if (!validPassword)
			return res.status(401).json({
				msg: "Incorrect user / Password - password",
			});

		const token = await generateJWT(user.id);

		res.json({
			user,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "Contact the administrator",
		});
	}
};

const googleSignIn = async (req = request, res = response) => {
	const { id_token } = req.body;
	try {
		const { name, img, email } = await googleVerify(id_token);
    let user = await User.findOne({ email });
    const data = {
      name,
      email,
      img,
      google: true,
      role: 'user'
    };
    if(!user){
      data.password = 'xd';
      user = new User(data);
      await user.save();
    } else if(user.state){
      const { _id, role, } = user;
      data.role = role;
      user = await User.findByIdAndUpdate(_id, data, { new: true });
    } else {
      return res.status(401).json({
        msg: 'Contact the administrator - user blocked'
      })
    }

    const token = await generateJWT(user.id);
    
		res.json({
			msg: "Google sign in",
      user,
      token
		});
	} catch (error) {
    console.log(error);
		res.status(401).json({
			msg: "Invalid Google token",
		});
	}
};

module.exports = {
	login,
	googleSignIn,
};
