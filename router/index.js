const Router = require('express')
const userController = require('../controllers/user-controller')
const clientController = require('../controllers/client-controller')

const router = new Router()

router.get('/logout', userController.logout)
router.get('/up-login', userController.upLogin)
router.get('/clients', clientController.clientsPage)
router.post('/login', userController.login)
router.post('/new-client', clientController.newClient)
router.put('/update', clientController.updateClient)

module.exports = router