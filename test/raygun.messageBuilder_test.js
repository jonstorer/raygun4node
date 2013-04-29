'use strict';

var messageBuilder = require('../lib/raygun.messageBuilder.js');

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

exports['basic builder tests'] = {
  setUp: function (done) {
    var builder = messageBuilder.raygunMessageBuilder();
    this.message = builder.build();
    done();
  },
  messageBuild: function (test) {
    test.ok(this.message);
    test.done();
  },
  builtMessageIncludesOccurredOn: function (test) {
    test.ok(this.message.occurredOn);
    test.done();
  },
  messageIncludesDetails: function (test) {
    test.ok(this.message.details);
    test.done();
  },
  messageIncludesClientDetails: function (test) {
    test.ok(this.message.details.client, 'provider information not included');
    test.ok(this.message.details.client.name, 'provider name not included');
    test.ok(this.message.details.client.version, 'provider version not included');
    test.done();
  },
  setMachineNameIncluded: function (test) {
    var builder = messageBuilder.raygunMessageBuilder();
    builder.setMachineName('server1');
    var message = builder.build();
    test.equals(message.details.machineName, 'server1');
    test.done();
  },
};

exports['error builder tests'] = {
  setUp: function (done) {
    var builder = messageBuilder.raygunMessageBuilder();
    builder.setErrorDetails(new Error());
    this.message = builder.build();
    done();
  },
  messageIncludesError: function (test) {
    test.ok(this.message.details.error);
    test.done();
  },
  messageIncludesErrorStackTrace: function (test) {
    test.ok(this.message.details.error.stackTrace);
    test.equal(this.message.details.error.stackTrace.length, 10);
    test.done();
  },
  messageIncludesErrorStackTraceCorrectly: function (test) {
    var stackTrace = this.message.details.error.stackTrace;
    stackTrace.forEach(function (stackTraceLine) {
      test.ok(stackTraceLine.lineNumber);
      test.ok(stackTraceLine.className);
      test.ok(stackTraceLine.fileName);
      test.ok(stackTraceLine.methodName);
    });
    test.done();
  },
};

exports['environment builder tests'] = {
  setUp: function (done) {
    var builder = messageBuilder.raygunMessageBuilder();
    builder.setEnvironmentDetails();
    this.message = builder.build();
    done();
  },
  environmentDetailsSet: function (test) {
    test.ok(this.message.environment);
    test.done();
  },
  processorCountSet: function (test) {
    test.ok(this.message.environment.processorCount);
    test.done();
  },
  osVersionSet: function (test) {
    test.ok(this.message.environment.osVersion);
    test.done();
  },
  cpuSet: function (test) {
    test.ok(this.message.environment.cpu);
    test.done();
  },
  architectureSet: function (test) {
    test.ok(this.message.environment.architecture);
    test.done();
  },
  totalPhysicalMemorySet: function (test) {
    test.ok(this.message.environment.totalPhysicalMemory);
    test.done();
  },
  availablePhysicalMemorySet: function (test) {
    test.ok(this.message.environment.availablePhysicalMemory);
    test.done();
  },
  utcOffsetIncluded: function (test) {
    test.ok(this.message.environment.utcOffset);
    test.done();
  },
};

exports['custom data builder tests'] = {
  allowCustomDataToBeSet: function (test) {
    var builder = messageBuilder.raygunMessageBuilder();
    builder.setUserCustomData({ foo: 'bar' });
    var message = builder.build();
    test.ok(message.details.userCustomData);
    test.equals(message.details.userCustomData.foo, 'bar');
    test.done();
  },
};