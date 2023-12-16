const userModel = require('../models/user-model')
const tokenService = require('../service/token-service')
const bcrypt = require('bcrypt')
const UserDto = require('../dtos/user-dto')

handleError = (response, error) => {
    response.status(500).json({message: 'Не предвиденная ошибка!', error});
};

class UserController {
    login(request, response) {
        const {username, password} = request.body;
        userModel
            .findOne({username})
            .then(async user => {
                if(!user) {
                    response
                        .status(403)
                        .json({message: 'Не верный логин!'})
                    
                    return
                }
                const isPassEquals = await bcrypt.compare(password, user.password);
                if (!isPassEquals) {
                    response
                        .status(403)
                        .json({message: 'Не верный пароль!'})

                    return
                }
                const userDto = new UserDto(user);
                const tokens = tokenService.generateToken({...userDto});
                await tokenService.saveToken(userDto.id, tokens.accessToken);
                response
                    .status(201)
                    .json({...tokens, user: userDto})
            })
            .catch((error) => handleError(response, error))
    }

    upLogin(request, response) {
        const authorization = request.headers.authorization
        if(!authorization) {
            return handleError(response,'Не предвиденная ошибка! Пройдите авторизацию!', 401)
        }
        const token = request.headers.authorization.split(' ')[1]
        if(!token) {
            return handleError(response,'Пользователь не авторизован!', 401)
        }
        const verifaiToken = tokenService.validateAccessToken(token)
        if(!verifaiToken) {
            return handleError(response,'В доступе отказано! Пройдите авторизацию!', 401)
        }
        response
            .status(201)
            .json({verifay: 'ok'})
    }
}

module.exports = new UserController()