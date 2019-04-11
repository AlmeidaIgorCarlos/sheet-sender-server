const bodyParser = require('body-parser')

module.exports = function (app) {

    app.use(bodyParser.urlencoded({
        extended: true,
        type: "application/json"
    }))
}