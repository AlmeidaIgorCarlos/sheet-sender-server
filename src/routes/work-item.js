const express = require('express')
const router = express.Router()
const workItemDB = require('./../services/database/work-item')
const authenticator = require('./../services/auth')

module.exports = function (app) {
    router.get('/work-item', async (req, res) => {
        try {
            const user = req.body 
            
            if (await authenticator.authorize(user.authentication))
                res.status(200).send(await workItemDB.getWorkItem(user))
            else
                throw new Error({message: 'User not authenticated'})

        } catch (error) {
            console.log(error)
            res.status(500).send({message: error.message})
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
            else
                throw new Error({message: 'User not authenticated'})

        } catch (error) {
            console.log(error)
            res.status(500).send({message: error.message})
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
            else
                throw new Error({message: 'User not authenticated'})
        } catch (error) {
            console.log(error)
            res.status(500).send({message: error.message})
        } finally {
            res.end()
        }
    })

    app.use('/', router)
}