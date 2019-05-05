const express = require('express')
const router = express.Router()
const userDatabase = require('./../services/database/user')
const authenticator = require('./../services/auth')
const errors = require('./../services/personalized-errors')

module.exports = function (app) {
    router.post('/sign-in', async (req, res, next) => {
        try {
            let user = req.body
            if (user.username === undefined || user.password === undefined)
                throw new errors.clientError('The user must provide valid username and password to sign in')

            user = await userDatabase.getUser(user)
            
            if(user !== undefined) user.authentication = await authenticator.authenticate(user)
            else user = {message: 'No user with these credentials found'}

            res.status(200).send(user)
        } catch (error) {
            if(error instanceof errors.clientError) res.status(400)
            if(error instanceof errors.databaseError) res.status(500)
            else res.status(500)
            
            console.log(error)
            res.send({message: error.message})
        } finally {
            res.end()
            next()
        }
    })

    app.use('/', router)
}