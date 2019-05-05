const express = require('express')
const router = express.Router()
const workItemDB = require('./../services/database/work-item')
const authenticator = require('./../services/auth')
const errors = require('./../services/personalized-errors')

module.exports = function (app) {
    router.get('/work-item', async (req, res) => {
        try {
            const user = req.body 
            
            if (await authenticator.authorize(user.authentication))
                res.status(200).send(await workItemDB.getWorkItem(user))
            else throw new errors.notAuthorized('User not authenticated')

        } catch (error) {
            if(error instanceof errors.databaseError) res.status(500)
            if(error instanceof errors.notAuthorized) res.status(500)
            else res.status(500)

            console.log(error)
            res.send({message: error.message})
        } finally {
            res.end()
        }
    })

    router.post('/work-item', async (req, res) => {
        try {
            const {user} = req.body

            if (await authenticator.authorize(user.authentication)){
                if(await workItemDB.insertWorkItem(req.body))
                    res.status(200).send({message: 'Work item registered successfully'})
            }
            else throw new errors.notAuthorized('User not authenticated')

        } catch (error) {
            if(error instanceof errors.databaseError) res.status(500)
            if(error instanceof errors.notAuthorized) res.status(500)
            else res.status(500)

            console.log(error)
            res.send({message: error.message})
        } finally {
            res.end()
        }
    })

    router.put('/work-item', async (req, res) => {
        try {
            const {user} = req.body

            if (await authenticator.authorize(user.authentication)){
                if(await workItemDB.updateWorkItem(req.body))
                    res.status(200).send({message: 'Work item updated successfully'})
            }
            else throw new errors.notAuthorized('User not authenticated')

        } catch (error) {
            if(error instanceof errors.databaseError) res.status(500)
            if(error instanceof errors.notAuthorized) res.status(500)
            else res.status(500)

            res.send({message: error.message})
        } finally {
            res.end()
        }
    })

    app.use('/', router)
}