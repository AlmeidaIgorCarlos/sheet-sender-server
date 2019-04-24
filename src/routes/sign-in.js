const express = require('express')
const router = express.Router()
const userDatabase = require('./../services/database/user')
const authenticator = require('./../services/auth')

module.exports = function (app) {
    router.post('/sign-in', async (req, res, next) => {
        try {
            let user = req.body
            if (user.username === undefined || user.password === undefined)
                throw new Error('The user must provide valid username and password to sign in')

            user = await userDatabase.getUser(user)
            
            if(user !== undefined) user.authentication = await authenticator.authenticate(user)
            else user = {message: 'No user with these credentials found'}

            res.status(200).send(user)
        } catch (error) {
            res.status(500).send({message: error.message})
        } finally {
            res.end()
            next()
        }
    })

    app.use('/', router)
}