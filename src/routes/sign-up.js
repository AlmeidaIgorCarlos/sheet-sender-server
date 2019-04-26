const express = require('express')
const route = express.Router()
const userDatabase = require('./../services/database/user')

function getUser(user, approach) {
    return new Promise(async (resolve, reject) => {
        try {
            if (approach) user = await userDatabase.getUser(user)
            else user = await userDatabase.getUserbyId(user._id)

            resolve(user)
        } catch (error) {
            console.log(error)
            reject(new Error('Occured an error during the execution of getUser in sign-up route'))
        }
    })
}

function isUserSaved(user) {
    try {
        if(user === undefined) return false
        else if (user.docs.length === 0) return false
        else return true
    } catch (error) {
        console.log(error)
        throw new Error('Occured an error during the execution of isUserSaved in sign-up route')
    }
}

module.exports = function (app) {
    route.post('/sign-up', async (req, res, next) => {
        try {
            let user = req.body
            user = await getUser(user, true)

            if (isUserSaved(user)) throw new Error('The informed user is already registered in the application')
            else {
                if (await userDatabase.insertUser(req.body))
                    res.status(200).send({ message: 'User registered successfully' })
            }

        } catch (error) {
            console.log(error)
            res.status(500).send({ message: error.message })
        } finally {
            res.end()
            next()
        }
    })

    route.put('/sign-up', async (req, res, next) => {
        try {
            let user = req.body
            user = await getUser(user, false)

            if(isUserSaved(user)){
                if(await userDatabase.updateUser(user))
                    res.status(200).send({message: 'User update successfully'})
            }
            else throw new Error('The informed user is not registered in the application')
        } catch (error) {
            console.log(error)
            res.status(500).send({message: error})
        } finally {
            res.end()
            next()
        }
    })

    app.use('/', route)
}