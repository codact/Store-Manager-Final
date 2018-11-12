
require = require("esm")(module)
const login = require('../login.js')

const ApiClient = api.default


const client = new ApiClient()

describe('These are all the tests for the app login', () => {
    it('should initialise HTML', () => {
        token = client.localStorage.getItem("token")
        let result = loginUser()
        assert.equal(result, token)
    });

});