const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./../config/swagger.json')

const express = require('express')
const router = express.Router()

module.exports = function(app){
    router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    app.use('/', router)
}