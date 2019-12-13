const axios = require('axios');

let response = {
    userId: "",
    login: false,
    passwordMissMatch: false,
    userExists: false
};


function getUsersUrl() {
    return 'https://api.mlab.com/api/1/databases/users/collections/buildyourplanusers?apiKey=kIOuLscCmhbeSOoBEtJUYPV6vy1TMIaQ';
}

async function getAllUsers() {
    return await axios.get(getUsersUrl());
}

const getUsersDetails = async (req) => {
    const users = await getUsers();
    const { id, password } = req.query;
    const userExists = users.data.filter((user) => {
        return user.userId === id
    });
    if (userExists) {
        users.data.forEach((user) => {
            if (user.userId === id) {
                if (user.password === password) {
                    response.userId = user.userId;
                    response.login = true;
                    response.userExists = true;
                    response.passwordMissMatch = false;
                } else {
                    response.userId = user.userId;
                    response.login = false;
                    response.passwordMissMatch = true;
                    response.userExists = true;
                }
            }
        });
    } else if (!userExists) {
        response.userId = id;
        response.login = false;
        response.userExists = false;
        response.passwordMissMatch = false;
    }
    return response;
};

async function addNewUser(req, res) {
    try {
        await axios.post(getUsersUrl(), req.body);
    } catch (e) {
        console.log(e);
        res.send({
            "userAdded": false
        });
    }
    res.send({
        "userAdded": true
    });
}

async function resetUser(req, res) {
    const updateUserUrl = `https://api.mlab.com/api/1/databases/users/collections/users-list/${req.query.id}?apiKey=kIOuLscCmhbeSOoBEtJUYPV6vy1TMIaQ`

    try {
        await axios.put(updateUserUrl, req.body);
    } catch (e) {
        console.log(e);
        res.send(e);
    }
    res.send('ok');
}

module.exports = {
    getUsersDetails,
    getAllUsers,
    addNewUser,
    resetUser
};
