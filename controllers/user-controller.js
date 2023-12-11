const userService = require('../service/user-service');

class UserController {
    async registration(req, res, next) {
        try {
            const {username, password} = req.body;
            const userData = await userService.registration(username, password);

            return res.json(userData);
        } catch(e) {
            console.log(e);
        }
    }

    async login(req, res, next) {
        try {
            const {username, password} = req.body;
            const userData = await userService.login(username, password);
            return res.json(userData);
        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = new UserController()