const express = require('express')
const router = express.Router()
const userDatabase = require('./../services/database/user')
const authenticator = require('./../services/auth')

module.exports = function(app){
    router.post('/sign-in', async (req, res, next)=>{
        try {
            let user = req.body
            
            user = await userDatabase.getUser(user)
            user.authentication = await authenticator.authenticate(user)

            res.send(user)
        } catch (error) {
            res.writeHead(500)
        } finally{
            res.end()
            next()
        }
    })

    app.use('/', router)
}