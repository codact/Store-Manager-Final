'use-strict';
const assert = require('chai').assert;
const login = require('../login').login;

describe('These are all the tests for the app login', () => {
    it('should initialise HTML', () => {
        let result = login()
        assert.equal(result, true)
    });

});