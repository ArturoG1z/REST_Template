const { response, request } = require('express');

const usersGet = (req = request, res = response) => {
  // query params
  const { q = '', name = 'No name', apikey = 'Error' } = req.query;
  res.json({
    msg: 'get API',
    q,
    name,
    apikey
  });
}
const usersPost = (req = request, res = response) => {
  const { name, age } = req.body;
  
  res.status(201).json({
    msg: 'post API',
    name,
    age
  });
}
const usersPut = (req = request, res = response) => {
  const { id }= req.params;
  res.json({
    msg: 'put API',
    id
  });
}
const usersPatch = (req = request, res = response) => {
  res.json({
    msg: 'patch API'
  });
}
const usersDelete = (req = request, res = response) => {
  res.json({
    msg: 'delete API'
  });
}

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
}