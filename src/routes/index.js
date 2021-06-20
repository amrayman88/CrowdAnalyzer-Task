const router = require('express').Router();
const dashboardRouter = require('./dashboard')

router.use('/dashboard', dashboardRouter)
module.exports = router