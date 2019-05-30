const request = require('request')
const errors = require('./../personalized-errors')
require('dotenv-safe').config()

module.exports = {
    insertWorkItem(workItem) {
        return new Promise((resolve, reject) => {
            try {
                if (typeof workItem !== 'object')
                    reject(new Error('The parameter for the insertWorkItem must be an object'))
                else if (typeof workItem.user !== 'object')
                    reject(new Error('The parameter for the insertWorkItem must have an user inner object'))

                workItem.entity = 'workitem'
                workItem.date = new Date()

                const requestData = {
                    method: 'POST',
                    uri: `${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`,
                    body: workItem,
                    json: true
                }
                request(requestData, (error, res) => {
                    if (error | res.statusCode != 201) reject(new errors.databaseError('The database operation did not work'))
                    else resolve(true)
                })

            } catch (error) {
                reject(new errors.databaseError('Occurred an error during the execution of insertWorkItem function'))
            }
        })
    },
    getWorkItem(workItemUser) {
        return new Promise((resolve, reject) => {
            try {
                if (typeof workItemUser !== 'object')
                    reject(new Error('The parameter for the getWorkItem must be an object'))
                const requestData = {
                    method: 'POST',
                    uri: `${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}/_find`,
                    body: {
                        selector: {
                            entity: 'workitem',
                            user: workItemUser
                        },
                        sort:[{date: 'asc'}]
                    },
                    json: true
                }

                request(requestData, (error, res, body) => {
                    if (error | res.statusCode != 200) reject(new errors.databaseError('The database operation did not work'))
                    else resolve(body.docs)
                })
            } catch (error) {
                reject(new errors.databaseError('Occurred an error during the execution of getWorkItem function'))
            }
        })
    },
    updateWorkItem(workItem) {
        return new Promise((resolve, reject) => {
            try {
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
                        uri: `${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}/${workItem._id}`,
                        body: workItem,
                        json: true
                    }

                    request(requestData, (error, res) => {
                        if (error | res.statusCode != 201) reject(new errors.databaseError('the database operation did not work'))
                        else resolve(true)
                    })
                }
            } catch (error) {
                reject(new errors.databaseError('Occurred an error during the execution of updateWorkItem funcion'))
            }

        })
    }
}