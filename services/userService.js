const db = require('../db/localDb');
const USERS_COLLECTION = 'users-list';

let response = {
    userId: "",
    login: false,
    passwordMissMatch: false,
    userExists: false
};

async function getUsers() {
    return { data: db.getAll(USERS_COLLECTION) };
}

const getUserDetails = async (req) => {
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
        db.insert(USERS_COLLECTION, req.body);
    } catch (e) {
        console.log(e);
        return res.send({
            "userAdded": false
        });
    }
    res.send({
        "userAdded": true
    });
}

async function resetUser(req, res) {
    try {
        db.update(USERS_COLLECTION, req.query.id, req.body);
    } catch (e) {
        console.log(e);
        return res.send(e);
    }
    res.send('ok');
}

module.exports = {
    getUserDetails,
    getUsers,
    addNewUser,
    resetUser
};
