const express = require('express')
const route = express.Router()
const userDatabase = require('./../services/database/user')

function getUser(req) {
    return new Promise(async (resolve, reject) => {
        try {
            const { body } = req
            const user = await userDatabase.getUser(body)

            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
}

function isUserSaved(user){
    if(user.docs.length === 0)
        return false
    else
        return true
}

module.exports = function (app) {
    route.post('/sign-up', async (req, res, next) => {
        try {
            const user = await getUser(req)
            if (!isUserSaved(user)) {
                if (await userDatabase.insertUser(req.body) === 201)
                    res.writeHead(200)
            }
            else
                res.writeHead(406)

        } catch (error) {
            res.writeHead(error)
        } finally {
            res.end()
            next()
        }
    })

    route.put('/sign-up', async (req, res, next) => {
        try {
            const user = await getUser(req)

            if(isUserSaved)
                userDatabase.updateUser()
            else{

            }

        } catch (error) {

        } finally {
            next()
        }
    })


    app.use('/', route)
}