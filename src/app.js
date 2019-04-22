const app = require('express')()
require('dotenv-safe').config()
const consign = require('consign')

consign()
    .include('./src/config/middlewares.js')
    .then('./src/routes/')
    .into(app)

app.listen(process.env._PORT)