const express = require('express');
const axios = require('axios');
const router = express.Router();
const { canAddUser }  = require('../services/userService');
const USER_URL = 'https://api.mlab.com/api/1/databases/users/collections/users-list?apiKey=kIOuLscCmhbeSOoBEtJUYPV6vy1TMIaQ'


router.post('/create', async function(req, res) {
    const users = await axios.get(USER_URL);
    const isNewUser = canAddUser(users, req.body.userId);
    if (isNewUser) {
        try {
            await axios.post(USER_URL, req.body);
        } catch (e) {
            res.send({
                "userAdded": false,
                "userExists": false
            });
        }
        res.send({
            "userAdded": true,
            "userExists": false
        });
    } else if (!isNewUser) {
        res.send({
            "userAdded": false,
            "userExists": true
        });
    }
});

module.exports = router;
