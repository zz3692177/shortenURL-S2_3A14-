const mgose = require('mongoose')
const Schema = mgose.Schema
const URLSchema = new Schema({
  origin_URL: {
    type: String,
    require: true
  },
  URLCode: {
    type: String,
    require: true
  }
})

module.exports = mgose.model('URL', URLSchema)