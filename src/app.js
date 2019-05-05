require('dotenv-safe').config()

const app = require('express')()
const consign = require('consign')

consign()
    .include('./src/config/middlewares.js')
    .then('./src/routes/')
    .into(app)

app.listen(process.env.PORT || 3000)