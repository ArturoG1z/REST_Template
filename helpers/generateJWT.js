const jwt = require("jsonwebtoken");

const generateJWT = (uid = "") => {
	return new Promise((resolve, reject) => {
		const payload = { uid };
		jwt.sign(
			payload,
			process.env.SECRETORPRIVATEKEY,
			{
				expiresIn: "15d",
			},
			(err, token) => {
				if (err) {
          console.log(err);
          reject('Token can\'t be generated');
				} else {
          resolve(token);
        }
			}
		);
	});
};

module.exports = {
	generateJWT,
};
