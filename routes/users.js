const { Router } = require('express');
const {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
} = require('../controllers/usersController');
const router = Router();
router
  .get("/", usersGet)
  .post("/", usersPost)
  .put("/:id", usersPut)
  .patch("/", usersPatch)
  .delete("/", usersDelete)

module.exports = router;