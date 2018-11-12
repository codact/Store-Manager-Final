
require = require("esm")(module)
const client = require('../static/js/client.js')
	var client = client()
	obj=client.default
	client= new client()

const login = require('../login').login;

describe('These are all the tests for the app login', () => {
    it('should initialise HTML', () => {
        let result = login()
        assert.equal(result, true)
    });

});