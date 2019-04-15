const assert = require('chai').assert
const auth = require('./../services/auth')
const userDatabase = require('./../services/database/user')

describe('auth testing', () => {

    it('authenticate method | auth property | giving all the parameters correctly, the auth must be true', async () => {
        const authentication = await auth.authenticate({ id: 1 })
        assert(authentication.auth)
    })

    it('authenticate method | token property | giving all parameters correctly, the token must be non-null', async () => {
        const authentication = await auth.authenticate({ id: 1 })
        assert(authentication.token)
    })

    it('authenticate method | incorrect parameter | as incorrect parameters are delivered, an error is expected', async () => {
        try {
            /*const authentication = */ await auth.authenticate('error')
            //assert(authentication.token)
        } catch (error) {
            assert(error.message.includes('user must be an object'))
        }
    })

    it('signOut method test | auth property', () => {
        const authentication = auth.signOut()
        assert(authentication.auth === false)
    })

    it('signOut method test | token property', () => {
        const authentication = auth.signOut()
        assert(authentication.token == false)
    })

    it('authorize method | giving token to receive authorization | authorization granted', () => {
        auth.authenticate({ id: 1 }).then(async (authentication) => {
            const authorization = await auth.authorize(authentication)
            assert(authorization === true)
        })
    })

    it('authorize method | giving token to receive authorization | as auth is false, an error is generated', async () => {
        const authentication = {
            token: 'non-null',
            auth: false
        }

        try {
            /*const authorization =*/ await auth.authorize(authentication)
            //assert(authorization)   
        } catch (error) {
            assert(error.message === 'The state of the authentication is false')
        }
    })

    it('authorize method | giving token to receive authorization | as token is null, an error is generated', async () => {
        const authentication = {
            //token: '',
            auth: true
        }

        try {
            /*const authorization =*/ await auth.authorize(authentication)
            //assert(authorization)   
        } catch (error) {
            assert(error.message === "The token's format is incorrect")
        }
    })
})

describe('couch-db testing', () => {
    it('insert user | correct parameters | must return true because all parameters are correct', async () => {
        const user = {
            name: "Igor Almeida",
            email: "teste@gmail.com"
        }

        const userInsertResult = await userDatabase.insertUser(user)
        assert(userInsertResult === true)
    }).timeout(0)

    it('insert user | incorrect parameters | must return an error because the parameter is wrong', async () => {
        try {
            const user = 'No object'

            /*const userInsertResult = */await userDatabase.insertUser(user)
            //assert(userInsertResult === true)
        } catch (error) {
            assert(error.message === 'The parameter to the insertUser function must be an JSON object')
        }
    })

    it('getUser | correct parameter | must return a valid document because the parameter is correct', async () => {
        const user = {
            name: "Igor Almeida",
            email: "teste@gmail.com"
        }

        const dbResult = await userDatabase.getUser(user)
        assert(typeof dbResult === 'object')
    })

    it('getUser | correct parameter | must return a valid document because the parameter is correct', async () => {
        const user = {
            name: "Igor Almeida",
            email: "teste@gmail.com"
        }

        const { statusCode } = await userDatabase.getUser(user)
        assert(statusCode === 200)
    })

    it('getUser | incorrect parameter | must return an erro because we are informing an string', async () => {
        try {
            await userDatabase.getUser('igor')
        } catch (error) {
            assert(error.message === 'The parameter for the getUser function must be an object')
        }
    })
})