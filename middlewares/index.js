const  validateFields  = require("./validate-user-fields");
const  validateJWT  = require('./validate-jwt');
const  validateRoles  = require("./validate-roles");

module.exports = {
  ...validateFields,
  ...validateJWT,
  ...validateRoles
}