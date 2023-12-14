const tokenService = require('../service/token-service')
const ClientModel = require('../models/client-model')

handleError = (response, error, code=500) => {
    response.status(code).json({message: error});
};

class ClientController {
    newClient(request, response) {
        const client = new ClientModel(request.body)
        client
            .save()
            .then(result => {
                response.status(201)
                response.json(result)
            })
            .catch(() => handleError(response, 'Не предвиденная ошибка!'))
    }

    getAllClient(request, response) {
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
        ClientModel
            .find()
            .then(result => {
                response.status(200)
                response.json(result)
            })
            .catch(() => handleError(response, 'Не предвиденная ошибка! Пройдите авторизацию!'))
    }

    deliteClientId(request, response) {
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
        ClientModel
            .findOneAndDelete({_id: request.body.id})
            .then(result => {
                response.status(200)
                response.json(result)
            })
            .catch(() => handleError(response, 'Не предвиденная ошибка! Пройдите авторизацию!'))
    }

}

module.exports = new ClientController()