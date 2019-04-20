const request = require('request')
require('dotenv-safe').config()

module.exports = {
    insertWorkItem(workItem) {
        return new Promise((resolve, reject) => {
            if (typeof workItem !== 'object')
                reject(new Error('The parameter for the insertWorkItem must be an object'))
            else if (typeof workItem.user !== 'object')
                reject(new Error('The parameter for the insertWorkItem must have an user inner object'))
            else {
                workItem.entity = 'workitem'

                const date = new Date()
                workItem.day = date.getDate()
                workItem.month = date.getMonth() + 1
                workItem.year = date.getFullYear()

                const requestData = {
                    method: 'POST',
                    uri: `${process.env.DATABASE_URL}:${process.env.DATABASE_PORT}/${process.env.DATABASE}`,
                    body: workItem,
                    json: true
                }

                request(requestData, (error, res) => {
                    if (error) reject(error)
                    else {
                        if (res.statusCode != 201) reject(res.statusCode)
                        else resolve(res.statusCode)
                    }
                })
            }
        })
    },
    getWorkItem(user) {
        return new Promise((resolve, reject) => {
            if (typeof user !== 'object')
                reject(new Error('The parameter for the getWorkItem must be an object'))
            else {
                const requestData = {
                    method: 'POST',
                    uri: `${process.env.DATABASE_URL}:${process.env.DATABASE_PORT}/${process.env.DATABASE}/_find`,
                    body: {
                        selector: {
                            entity: 'workitem',
                            user: user
                        }
                    },
                    json: true
                }

                request(requestData, (error, res, body) => {
                    if (error)
                        reject(error)
                    else {
                        if (res.statusCode != 200)
                            reject(res.statusCode)
                        else {
                            resolve(res.statusCode)
                        }
                    }
                })
            }
        })
    },
    updateWorkItem(workItem) {
        return new Promise((resolve, reject) => {
            if (typeof workItem !== 'object')
                reject(new Error('The parameter for the updateWorkItem must be an object'))
            else if (typeof workItem.user !== 'object')
                reject(new Error('The parameter for the insertWorkItem must have an user inner object'))
            else if (typeof workItem._id === 'undefined')
                reject(new Error('The parameter for the updateWorkItem must have an _id inner attribute'))
            else if (typeof workItem._rev === 'undefined')
                reject(new Error('The parameter for the updateWorkItem must have an _rev inner attribute'))
            else {
                const requestData = {
                    method: 'PUT',
                    uri: `${process.env.DATABASE_URL}:${process.env.DATABASE_PORT}/${process.env.DATABASE}/${workItem._id}`,
                    body: workItem,
                    json: true
                }

                request(requestData, (error, res, body) => {
                    if (error) reject(error)
                    else {
                        if (res.statusCode != 201) reject(res.statusCode)
                        else resolve(res.statusCode)
                    }
                })
            }
        })
    }
}