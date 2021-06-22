const router = require('express').Router();
const { DashboardController } = require('../controllers')

router.get('/', DashboardController.getAll)
router.post('/', DashboardController.create)
router.delete('/:id', DashboardController.remove)
router.post('/chart', DashboardController.createChart)

module.exports = router