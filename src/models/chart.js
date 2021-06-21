const { model } = require('mongoose')
const { ChartSchema } = require('../schema')

module.exports = model('Chart', ChartSchema)

