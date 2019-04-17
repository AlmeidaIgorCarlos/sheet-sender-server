const express = require('express')
const route = express.Router()
const userDatabase = require('./../services/database/user')

function getUser(req, approach) {
    return new Promise(async (resolve, reject) => {
        try {
            const { body } = req
            let user
            if (approach === true)
                user = await userDatabase.getUser(body)
            else if (approach === false)
                user = await userDatabase.getUserbyId(body._id)

            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
}

function isUserSaved(user) {
    if (user.docs.length === 0)
        return false
    else
        return true
}

module.exports = function (app) {
    route.post('/sign-up', async (req, res, next) => {
        try {
            const user = await getUser(req, true)
            if (!isUserSaved(user)) {
                if (await userDatabase.insertUser(req.body) === 201)
                    res.writeHead(200)
            }
            else
                res.writeHead(406)

        } catch (error) {
            res.writeHead(500)
        } finally {
            res.end()
            next()
        }
    })

    route.put('/sign-up', async (req, res, next) => {
        try {
            await getUser(req, false)
            await userDatabase.updateUser(req.body)
        } catch (error) {
            res.writeHead(500)
        } finally {
            res.end()
            next()
        }
    })


    app.use('/', route)
}