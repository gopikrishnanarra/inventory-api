const express = require('express');
const router = express.Router();
const { getUserDetails, getUsers, resetUser, addNewUser}  = require('../services/userService');
const { getUsersDetails, getAllUsers }  = require('../services/getBuildyourplanusers');

router.get('/userDetails', async function(req, res) {
    const response = await getUserDetails(req);
    res.send(response);
});
router.get('/buildYourPlanUserDetails', async function(req, res) {
    const response = await getUsersDetails(req);
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
router.get('/buildYourPlanUserDetails/all', async function(req, res) {
    const users = await getAllUsers();
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

router.put('/resetUser', async function(req, res) {
    await resetUser(req, res);
});

module.exports = router;
