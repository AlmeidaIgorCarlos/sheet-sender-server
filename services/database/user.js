const request = require('request')
require('dotenv-safe').config()

module.exports = {
    insertUser: (user) => {
        return new Promise((resolve, reject) => {
            if (typeof user !== 'object')
                reject(new Error('The parameter to the insertUser function must be an JSON object'))
            else {

                const options = {
                    method: 'POST',
                    uri: `http://${process.env.DATABASE_URL}:${process.env.DATABASE_PORT}/${process.env.DATABASE}`,
                    body: user,
                    json: true // Automatically stringifies the body to JSON
                }

                try {
                    request.post(options, (error, res) => {
                        if (error)
                            reject(new Error(`The database operation didn't work: ${error}`))
                        else if (res.statusCode !== 201)
                            reject(new Error(`The database operation didn't work - status code: ${res.statusCode}`))
                        else
                            resolve(res.body.ok)
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
                const options = {
                    method: 'POST',
                    uri: `http://${process.env.DATABASE_URL}:${process.env.DATABASE_PORT}/${process.env.DATABASE}/_find`,
                    body: { selector: user },
                    json: true // Automatically stringifies the body to JSON
                }

                try {
                    request.post(options, (error, res) => {
                        if (error)
                            reject(error)
                        else if (res.statusCode !== 200)
                            reject(new Error(`Error getting the user - statusCode: ${res.statusCode}`))
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
    }
}