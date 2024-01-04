const jwt = require('jsonwebtoken')
const tokenModel = require('../models/token-model')

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {expiresIn:'60m'})
        return {
            accessToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId, accessToken) {
        const tokenData = await tokenModel.findOne({user: userId})
        if(tokenData) {
            tokenData.accessToken = accessToken
            return tokenData.save()
        }
        const token = await tokenModel.create({user: userId, accessToken})
        return token
    }
    async remoteToken(accessToken) {
        const dataToken = await tokenModel.deleteOne({accessToken})
        return dataToken
    }
}

module.exports = new TokenService()