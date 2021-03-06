const request = require('request')
const errors = require('./../personalized-errors')
require('dotenv-safe').config()

module.exports = {
    insertUser: (user) => { 
        return new Promise((resolve, reject) => {
            try {
                user.entity = 'user'
                
                const requestData = {
                    method: 'POST',
                    uri: `${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`,
                    body: user,
                    json: true
                }

                request.post(requestData, (error, res) => {
                    if (error || res.statusCode !== 201) reject(new errors.databaseError(`The database operation didn't work`))
                    else resolve(true)
                })
            } catch (error) {
                reject(new errors.databaseError(`Occurred an error during the execution of insertUser function`))
            }
        })
    },
    getUser(user) {
        return new Promise((resolve, reject) => {
            try {
                user.entity = 'user'

                const requestData = {
                    method: 'POST',
                    uri: `${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}/_find`,
                    body: { selector: user },
                    json: true
                }

                request(requestData, (error, res) => {
                    if (error || res.statusCode !== 200) reject(new errors.databaseError(`The database operation didn't work`))
                    else resolve(res.body.docs[0])
                })
            } catch (error) {
                reject(new errors.databaseError(`Occurred an error during the execution of getUser function`))
            }
        })
    },
    getUserById(_id) {
        return new Promise((resolve, reject) => {
            try {
                const url = `${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}/${_id}`
                request(url, (error, res) => {
                    if (error || res.statusCode !== 200) reject(new errors.databaseError(`The database operation didn't work`))
                    else resolve(res.body)
                })
            } catch (error) {
                reject(new errors.databaseError(`Occurred an error during the execution of getUserById function`))
            }
        })
    },
    updateUser(user) {
        return new Promise((resolve, reject) => {
            try {
                const requestData = {
                    method: 'PUT',
                    uri: `${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}/${user._id}`,
                    body: user,
                    json: true
                }

                request(requestData, (error, res) => {
                    if (error || res.statusCode !== 201) reject(new errors.databaseError(`The database operation didn't work`))
                    else resolve(true)
                })

            } catch (error) {
                reject(new errors.databaseError(`Occurred an error during the execution of updateUser function`))
            }
        })

    }
}