const assert = require('chai').assert
const auth = require('./../services/auth')
describe('Auth testing', () => {

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