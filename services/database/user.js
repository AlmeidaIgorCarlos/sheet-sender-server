const request = require('request')
require('dotenv-safe').config()

module.exports = {
    insertUser: (user) => {
        return new Promise((resolve, reject) => {
            if (typeof user !== 'object')
                reject(new Error('The parameter to the insertUser function must be an JSON object'))
            else {

                const requestData = {
                    method: 'POST',
                    uri: `http://${process.env.DATABASE_URL}:${process.env.DATABASE_PORT}/${process.env.DATABASE}`,
                    body: user,
                    json: true // Automatically stringifies the body to JSON
                }

                try {
                    request.post(requestData, (error, res) => {
                        if (error)
                            reject(new Error(`The database operation didn't work: ${error}`))
                        else if (res.statusCode !== 201)
                            reject(res.statusCode)
                        else
                            resolve(res.statusCode)
                    })
                } catch (error) {
                    reject(new Error(`The database operation didn't work: ${error}`))
                }
            }
        })
    },
    getUser(user) {
        return new Promise((resolve, reject) => {
            if (typeof user !== 'object')
                reject(new Error('The parameter for the getUser function must be an object'))
            else {
                const requestData = {
                    method: 'POST',
                    uri: `http://${process.env.DATABASE_URL}:${process.env.DATABASE_PORT}/${process.env.DATABASE}/_find`,
                    body: { selector: user },
                    json: true // Automatically stringifies the body to JSON
                }

                try {
                    request(requestData, (error, res) => {
                        if (error)
                            reject(error)
                        else if (res.statusCode !== 200)
                            reject(res.statusCode)
                        else {
                            let { body } = res
                            body.statusCode = res.statusCode
                            resolve(body)
                        }
                    })
                } catch (error) {
                    reject(error)
                }
            }
        })
    },
    getUserbyId(_id) {
        return new Promise((resolve, reject) => {
            if (typeof _id !== 'string')
                reject(new Error('The parameter for the getUserById function must be an string'))
            else {
                const url = `http://${process.env.DATABASE_URL}:${process.env.DATABASE_PORT}/${process.env.DATABASE}/${_id}`

                try {
                    request(url, (error, res) => {
                        if (error)
                            reject(error)
                        else if (res.statusCode !== 200)
                            reject(res.statusCode)
                        else {
                            let { body } = res
                            body.statusCode = res.statusCode
                            resolve(body)
                        }
                    })
                } catch (error) {
                    reject(error)
                }
            }
        })
    },
    updateUser(user) {
        return new Promise((resolve, reject) => {
            if (typeof user !== 'object')
                reject(new Error('The parameter for the updateUser function must be an object'))
            else if (user._rev === undefined)
                reject(new Error('The user parameter must have a valid _rev attribute'))
            else if (user._id === undefined)
                reject(new Error('The user parameter must have a valid _id attribute'))
            else {
                const requestData = {
                    method: 'PUT',
                    uri: `http://${process.env.DATABASE_URL}:${process.env.DATABASE_PORT}/${process.env.DATABASE}/${user._id}`,
                    body: user,
                    json: true
                }

                request(requestData, (error, res) => {
                    if (error)
                        reject(error)
                    else if (res.statusCode !== 201)
                        reject(res.statusCode)
                    else {
                        resolve(res.statusCode)
                    }
                })
            }
        })

    }
}