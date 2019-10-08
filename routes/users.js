const express = require('express');
const router = express.Router();
const { getUserDetails, getUsers, canAddUser, addNewUser}  = require('../services/userService');

router.get('/userDetails', async function(req, res) {
    const response = await getUserDetails(req);
    res.send(response);
});
router.get('/all', async function(req, res) {
    const users = await getUsers();
    const allUserIds = users.data.map((user) => {
        return {
            userId: user.userId,
            id: user._id.$oid
        }
    });
    res.send(allUserIds);
});

router.post('/create', async function(req, res) {
    await addNewUser(req, res);
});

module.exports = router;
