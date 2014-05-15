'use strict';

var sinon = require('sinon');
var logee = require('../.');

/* jshint expr: true */
describe('Logger', function () {
  describe('#constructor', function () {
    it('should create functions for all log levels that call #log', function () {
      var options = {
        levels: ['foo', 'bar', 'baz'],
        level: 'bar'
      };
      var log = new logee.Logger(options);
      log.should.have.properties(['foo', 'bar', 'baz']);

      sinon.stub(log, 'log');
      log.foo('test1');
      log.bar('test2');
      log.baz('test3');
      log.log.calledWith('foo').should.be.ok;
      log.log.calledWith('bar').should.be.ok;
      log.log.calledWith('baz').should.be.ok;
    });
  });
  describe('#log', function () {
    beforeEach(function () {
      sinon.stub(console, 'log');
    });
    afterEach(function () {
      console.log.restore();
    });
    it('should call console.log', function () {
      var log = new logee.Logger();

      log.log('info', 'test');

      console.log.calledOnce.should.be.true;
    });
    it('should print the name of the Logger', function () {
      var options = {
        name: 'myTestLogger'
      };
      var log = new logee.Logger(options);

      log.log('info', 'test');

      console.log.calledWithMatch(/\\[myTestLogger\\]/);
    });
    it('should not print brackets if the name is empty', function () {
      var options = {
        name: ''
      };
      var log = new logee.Logger(options);

      log.log('info', 'test');

      console.log.neverCalledWithMatch(/\\[\\]/);
    });
  });
});
