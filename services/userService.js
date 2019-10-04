let response = {
    userId: "",
    login: false,
    passwordMissMatch: false,
    userExists: false
};

const getUserDetails = (users, req) => {
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

module.exports = getUserDetails;