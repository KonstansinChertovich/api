const clientService = require('../service/client-service')
const tokenService = require('../service/token-service')

class ClientController {
    async newClient(req, res, next) {
        try {
            const clienData = await clientService.registrationClient(req.body);

            return await res.json(clienData);
        } catch(e) {
            console.log(e);
        }
    }

    async getAllClient(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1]
            if(!token) {
                return res.status(403).json({message: 'Пользователь не авторизован!'})
            }
            const verifaiToken = tokenService.validateAccessToken(token)
            if(!verifaiToken) {
                return res.status(403).json({message: 'Что то пошло не так, авторизуйтесь!'})
            }
            const clienData = await clientService.getClients();

            return await res.json(clienData);
        } catch(e) {
            console.log(e)
        }
    }

    async deliteClientId(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1]
            if(!token) {
                return res.status(403).json({message: 'Пользователь не авторизован!'})
            }
            const verifaiToken = tokenService.validateAccessToken(token)
            if(!verifaiToken) {
                return res.status(403).json({message: 'Что то пошло не так, авторизуйтесь!'})
            }
            const clienData = await clientService.deliteClientById(req.body);

            return await res.json(clienData);
        } catch(e) {
            console.log(e)
        }
    }

}

module.exports = new ClientController()