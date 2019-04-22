const express = require('express')
const router = express.Router()

module.exports = function(app){
    router.post('/sign-in', (req, res, next)=>{
        try {
            
        } catch (error) {
            
        } finally{
            next()
        }
    })

    app.use('/', router)
}