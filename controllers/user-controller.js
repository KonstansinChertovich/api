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
                    .header("Access-Control-Allow-Origin", request.headers.origin) 
                    .header ('Access-Control-Allow-Credentials', true)
                    .cookie('accessToken', tokens.accessToken, {
                        maxAge: 60 * 60 * 1000, 
                        secure: true,
                        sameSite: 'lax'
                    })
                    .json({...tokens, user: userDto})
            })
            .catch((error) => handleError(response, error))
    }

    upLogin(request, response) {
        const {accessToken} = request.cookies
        if(!accessToken) {
            return handleError(response,'Пользователь не авторизован!', 401)
        }
        const verifaiToken = tokenService.validateAccessToken(accessToken)
        if(!verifaiToken) {
            return handleError(response,'В доступе отказано! Пройдите авторизацию!', 401)
        }
        response
            .status(200)
            .json({verifay: 'ok'})
    }

    logout(request, response) {
        const {accessToken} = request.cookies
        const dataToken = tokenService.remoteToken(accessToken)

        response
            .status(200)
            .clearCookie('accessToken')
            .json(dataToken)
    }
}

module.exports = new UserController()
