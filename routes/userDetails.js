const express = require('express');
const axios = require('axios');
const router = express.Router();
const { getUserDetails }  = require('../services/userService');

router.get('/', async function(req, res) {
    const users = await axios.get('https://api.mlab.com/api/1/databases/users/collections/users-list?apiKey=kIOuLscCmhbeSOoBEtJUYPV6vy1TMIaQ');
    const response = getUserDetails(users, req);
    res.send(response);
});

module.exports = router;
