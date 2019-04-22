const express = require('express')
const router = express.Router()
const workItemDB = require('./../services/database/work-item')
const authenticator = require('./../services/auth')

module.exports = function(app){
    router.get('/work-item', async (req, res)=>{
        try {
            const permission = await authenticator.authorize(req.body.authentication)
            if(permission){
                const response = await workItemDB.getWorkItem(req.body)
                res.send(response)
            }else{
                throw 501
            }
        } catch (error) {
            console.log(error)
            res.writeHead(500)
        }finally{
            res.end()
        }
    })

    router.post('/work-item', async (req, res)=>{
        try {
            const statusCode = await workItemDB.insertWorkItem(req.body)
            res.writeHead(statusCode)
        } catch (error) {
            res.writeHead(500)
        }finally{
            res.end()
        }
    })

    router.put('/work-item', async (req, res)=>{
        try {
            const statusCode = await workItemDB.updateWorkItem(req.body)
            res.writeHead(statusCode)
        } catch (error) {
            res.writeHead(error)
        }finally{
            res.end()
        }
    })

    app.use('/', router)
}