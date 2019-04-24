const request = require('request')
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
                    if (error | res.statusCode != 201) reject(new Error('The database operation did not work'))
                    else resolve(true)
                })

            } catch (error) {
                reject(new Error('Occurred an error during the execution of insertWorkItem function'))
            }
        })
    },
    getWorkItem(_user) {
        return new Promise((resolve, reject) => {
            try {
                if (typeof _user !== 'object')
                    reject(new Error('The parameter for the getWorkItem must be an object'))
                const requestData = {
                    method: 'POST',
                    uri: `${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}/_find`,
                    body: {
                        selector: {
                            entity: 'workitem',
                            user: _user
                        }
                    },
                    json: true
                }

                request(requestData, (error, res, body) => {
                    if (error | res.statusCode != 200) reject(new Error('The database operation did not work'))
                    else resolve(body.docs)
                })
            } catch (error) {
                reject(new Error('Occurred an error during the execution of getWorkItem function'))
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
                        if (error | res.statusCode != 201) reject(new Error('the database operation did not work'))
                        else resolve(true)
                    })
                }
            } catch (error) {
                reject(new Error('Occurred an error during the execution of updateWorkItem funcion'))
            }

        })
    }
}