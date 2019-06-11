const request = require('request')
const errors = require('./../personalized-errors')
require('dotenv-safe').config()

module.exports = {
    insertWorkItem(workItem) {
        return new Promise((resolve, reject) => {
            try {
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
    }
}