const ClientModel = require('../models/client-model')

class ClientService {
    async registrationClient(body) {
        const candidate = await ClientModel.findOne({ username: body.username})
        if(candidate) {
            throw new Error(`Пользователь ${body.username} уже существует!`)
        }
        const client = await ClientModel.create(body)
        
        return client
    }
    async getClients() {
        const clients = await ClientModel.find()
        return clients
    }

    async deliteClientById(body) {
        const candidate = await ClientModel.findByIdAndDelete(body.id)
        
        return candidate
    }
}

module.exports = new ClientService()