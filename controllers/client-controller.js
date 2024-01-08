const tokenService = require('../service/token-service')
const ClientModel = require('../models/client-model');
const clientModel = require('../models/client-model');

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

    async updateClient(request,response) {
        const clients = await ClientModel.updateMany({firstOpen: true})
        response
            .status(201)
            .json(clients)
    }

    async clientsPage(request, response) {
        const {page, limit} = request.query
        const {accessToken} = request.cookies

        if(!accessToken) {
            return handleError(response,'Не предвиденная ошибка! Пройдите авторизацию!', 401)
        }

        const verifaiToken = tokenService.validateAccessToken(accessToken)
        
        if(!verifaiToken) {
            return handleError(response,'В доступе отказано! Пройдите авторизацию!', 401)
        }
        
        const countDb = await clientModel.countDocuments()

        ClientModel
            .find()
            .skip(((limit || 0) * (page || 0)) - (limit || 0))
            .limit((limit || 0))
            .then(result => {
                response
                .status(200)
                .json({
                    clients: result,
                    countDocument: countDb
                })
            })
            .catch(() => handleError(response, 'Не предвиденная ошибка! Пройдите авторизацию!'))

    }
}

module.exports = new ClientController()