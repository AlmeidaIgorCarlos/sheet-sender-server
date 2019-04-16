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

    it('insertUser | Incorrect parameters | Must return an error because the parameter is wrong', async () => {
        try {
            const user = 'No object'
            await userDatabase.insertUser(user)
        } catch (error) {
            assert(error.message === 'The parameter to the insertUser function must be an JSON object')
        }
    })

    it('insertUser | No parameters | Must return an error because no paramater is provided', async () => {
        try {
            await userDatabase.insertUser()
        } catch (error) {
            assert(error.message === 'The parameter to the insertUser function must be an JSON object')
        }
    })

    it('getUser | Incorrect parameter | Must return an error because we are informing an string', async () => {
        try {
            await userDatabase.getUser('igor')
        } catch (error) {
            assert(error.message === 'The parameter for the getUser function must be an object')
        }
    })
    
    it('getUser | Incorrect parameter | Must return an error because no parameter is provided', async () => {
        try {
            await userDatabase.getUser()
        } catch (error) {
            assert(error.message === 'The parameter for the getUser function must be an object')
        }
    })

    it('updateUser | Incorrect parameter type | Must return an error because the parameter type is incorrect', async ()=>{
        try {
            const user = ''
            await userDatabase.updateUser(user)
        } catch (error) {
            assert(error.message === 'The parameter for the updateUser function must be an object')
        }
    })

    it('updateUser | Incorrect parameter type | Must return an error because the parameter does not have the _rev attribute', async ()=>{
        try {
            const user = {
                name: 'testuser'
            }
            await userDatabase.updateUser(user)
        } catch (error) {
            assert(error.message === 'The user parameter must have a valid _rev attribute')
        }
    })

    it('updateUser | Incorrect parameter | Must return an error because no parameter is provided', async ()=>{
        try {
            await userDatabase.updateUser()
        } catch (error) {
            assert(error.message === 'The parameter for the updateUser function must be an object')
        }
    })
})