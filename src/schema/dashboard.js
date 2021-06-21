const config = require('../../config')

const { Schema } = require('mongoose')
const { DashboardChartsValidator } = require('../validators')

module.exports = new Schema({
  title: {
    type: String,
    maxLength: config.dahsboardTitleMaxLength,
  },
  description: {
    type: String,
    maxLength: config.dahsboardDiscriptionMaxLength,
  },
  charts: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: "Chart",
    }],
    validate: DashboardChartsValidator
  }
});