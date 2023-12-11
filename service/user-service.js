const UserModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const tokenService = require('../service/token-service')
const UserDto = require('../dtos/user-dto')

class UserService {
    async registration(username, password) {
        const candidate = await UserModel.findOne({username})
        if(candidate) {
            throw new Error(`Пользователь с ${username} уже существует!`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const user = await UserModel.create({username, password: hashPassword})

        const userDto = new UserDto(user)
        const tokens = tokenService.generateToken({...userDto})
        await tokenService.saveToken(userDto.id, tokens.accessToken)
        
        return {
            ...tokens,
            user: userDto
        }
    }

    async login(username, password) {
        const user = await UserModel.findOne({username})
        if (!user) {
            throw new Error('Пользователь с таким email не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw new Error('Неверный пароль');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto});

        await tokenService.saveToken(userDto.id, tokens.accessToken);
        return {...tokens, user: userDto}
    }
}

module.exports = new UserService()