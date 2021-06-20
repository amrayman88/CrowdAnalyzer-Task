const router = require('express').Router();
const {DashboardController} = require('../controllers')

router.get('/',DashboardController.getAll)
router.post('/',DashboardController.create)
router.delete('/',DashboardController.remove)

module.exports = router