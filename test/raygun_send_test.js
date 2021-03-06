'use strict';

var Raygun = require('../lib/raygun.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['raygun functional sending test'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  sendException: function(test) {
    var options = {
      apiKey: '' // set a valid api key to run this test
    };

    var client = new Raygun.Client().init(options);

    client.send(new Error(), {}, function (response){
      test.equals(response.statusCode, 202);
      test.done();
    });
  },
  sendExceptionWithUser: function(test) {
    var options = {
      apiKey: '' // set a valid api key to run this test
    };

    var client = new Raygun.Client().init(options).setUser("callum@mindscape.co.nz").setVersion("1.0.0.0");

    client.send(new Error(), {}, function (response){
      test.equals(response.statusCode, 202);
      test.done();
    });
  }
};
