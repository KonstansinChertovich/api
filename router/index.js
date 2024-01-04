const Router = require('express')
const userController = require('../controllers/user-controller')
const clientController = require('../controllers/client-controller')

const router = new Router()

router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/up-login', userController.upLogin)
router.put('/update', clientController.updateClient)
router.post('/new-client', clientController.newClient)
router.get('/all-client', clientController.getAllClient)
router.get('/clients', clientController.clientsPage)


router.get('/test', clientController.pagination)

module.exports = router