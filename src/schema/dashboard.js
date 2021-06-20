const { Schema } = require('mongoose')

module.exports = new Schema({
    title: String,
    description: String,
    charts: [String]
  });