const{model} = require('mongoose')
const{DashboardSchema} = require('../schema')

module.exports = model('Dashboard',DashboardSchema)