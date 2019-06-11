const JWT = require('jsonwebtoken')
require('dotenv-safe').config()

module.exports = {
    authenticate(user /*Object*/) {
        return new Promise((resolve, reject) => {
            try {
                const token = JWT.sign(user, process.env.SECRET, {
                    expiresIn: 1800 //expires in 30min
                })

                resolve({
                    token: token,
                    auth: true
                })
            } catch (error) {
                throw new Error('Ocurred an error during the execution of authenticate function')
            }
        })
    },
    signOut() {
        return {
            token: '',
            auth: false
        }
    },
    authorize(authentication) {
        return new Promise((resolve, reject) => {
            try {
                JWT.verify(authentication.token, process.env.SECRET, (err) => {
                    if (err) reject(new Error('Ocurred an error during token verification'))
                    else resolve(true)
                })
            } catch (error) {
                throw new Error('Ocurred an error during the execution of authorize function')
            }
        })
    }
}