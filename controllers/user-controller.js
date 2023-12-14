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
}

module.exports = new UserController()