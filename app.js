const app = require('express')()
require('dotenv-safe').config()
const consign = require('consign')

consign()
    .include('./config/middlewares.js')
    .then('./routes/')
    .into(app)

app.listen(process.env.PORT)