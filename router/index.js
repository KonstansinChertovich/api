const Router = require('express')
const userController = require('../controllers/user-controller')
const clientController = require('../controllers/client-controller')

const router = new Router()

router.post('/login', userController.login)
router.get('/up-login', userController.upLogin)
router.post('/new-client', clientController.newClient)
router.get('/all-client', clientController.getAllClient)
router.delete('/delete-client', clientController.deliteClientId)

module.exports = router