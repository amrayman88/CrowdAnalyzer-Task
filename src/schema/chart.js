const config = require('../../config')

const { Schema } = require('mongoose')

module.exports = new Schema({
  title: String,
  type: {
    type: String,
    enum: ['pie', 'line', 'bar']
  },
  dateRange: {
    from: Date,
    to: Date
  },
  interval: {
    type: String,
    enum: ['hour', 'day', 'month'],
    validate: [function () {
      const range = (this.dateRange.to - this.dateRange.from)
      return !(raneg >= (config.chartHourConstraintMs)
        && this.interval === 'hour')
    }, `Cannot set interval to hour when date range is more than or equal ${config.chartHourConstraint} days`]
  },
})