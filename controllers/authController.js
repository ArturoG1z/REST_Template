const { response, request } = require("express");
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require("../helpers/generateJWT");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    // verify if email exists
    const user = await User.findOne({email});
    if(!user)
      return res.status(400).json({
        msg: 'Incorrect user / Password - email'
      });
    
    if(!user.state)
      return res.status(400).json({
        msg: 'Incorrect user / Password - state false'
      });
    const validPassword = bcryptjs.compareSync(password, user.password);
    if(!validPassword)
      return res.status(400).json({
        msg: 'Incorrect user / Password - password'
      });
    
    const token = await generateJWT(user.id);

    
    res.json({
      user,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Contact the administrator'
    })
  }
};

module.exports = {
	login,
};
