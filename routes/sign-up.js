const express = require('express')
const route = express.Router()

module.exports = function(app){
    route.post('sign-up', (req, res, next)=>{
        try {
            
        } catch (error) {
            
        }finally{
            next()
        }
    })

    route.put('sign-up', (req, res, next)=>{
        try {
            
        } catch (error) {
            
        }finally{
            next()
        }
    })

    app.use('/', route)
}