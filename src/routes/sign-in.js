const express = require('express')
const router = express.Router()
const userDatabase = require('./../services/database/user')
const authenticator = require('./../services/auth')

module.exports = function(app){
    router.post('/sign-in', async (req, res, next)=>{
        try {
            const {body} = req
            const user = await userDatabase.getUser(body)
            if(user.statusCode === 200)
                user.authentication = await authenticator.authenticate(user)
            else
                throw new Error('User not authenticated')

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