const { Router } = require("express");
const { check } = require("express-validator");
const {
	usersGet,
	usersPost,
	usersPut,
	usersPatch,
	usersDelete,
} = require("../controllers/usersController");
const {
	itIsValidRole,
	emailExists,
	userExistsById,
} = require("../helpers/db-validators");
const { validateFields } = require("../middlewares/validate-user-fields");

const router = Router();
router
	.get(
		"/",
		[
			check("limit").optional().isNumeric(),
			check("from").optional().isNumeric(),
			validateFields,
		],
		usersGet
	)
	.post(
		"/",
		[
			check("name", "The name is required").not().isEmpty(),
			check("email", "The email is not valid").isEmail(),
			check(
				"password",
				"The password must have more than 6 characters"
			).isLength(6),
			check("role").custom(itIsValidRole),
			check("email").custom(emailExists),
			validateFields,
		],
		usersPost
	)
	.put(
		"/:id",
		[
			check("id", "It is not a valid ID").isMongoId(),
			check("id").custom(userExistsById),
			check("name", "The name is required").optional().not().isEmpty(),
			check("role").optional().custom(itIsValidRole),
			check("state").optional().isBoolean(),
			validateFields,
		],
		usersPut
	)
	.patch("/", usersPatch)
	.delete(
		"/:id",
		[
			check("id", "It is not a valid ID").isMongoId(),
			check("id").custom(userExistsById),
			validateFields,
		],
		usersDelete
	);

module.exports = router;
