/**
 * @file logger.js Logger class that is used by logee
 *
 * (c) 2014 Alex Mikhalev
 * Under the MIT License
 */

'use strict';

var _ = require('lodash'),
  util = require('util');

/**
 * Constructs a new Logger
 * @param {Object} options The options to use with this logger
 * @param {String} options.name The name of this logger
 * @param {String[]} options.levels The list of levels that this logger uses,
 * in order from least verbose to most verbose
 * @param {String} options.level The minimum level that this logger outputs.
 * @constructor
 * @example
 *  var log = new logee.Logger({
 *    name: 'MyLogger',
 *    levels: ['silly', 'eh', 'bad', 'horrible'],
 *    level: 'eh'
 *  });
 *  log.silly('much baz');
 */
var Logger = function Logger(options) {
  this.name = '';
  this.levels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'];
  this.level = 'info';

  _.extend(this, options);

  var self = this;
  _.forEach(this.levels, function(level) {
    self[level] = function() {
      var args = Array.prototype.slice.call(arguments);
      args.unshift(level);
      self.log.apply(self, args);
    };
  });
};

/**
 * Logs a message
 * @param {String} level The level to log at
 * @param {*} [arguments] Arguments that are passed to util.format to
 * construct the message
 */
Logger.prototype.log = function (level) {
  var args = Array.prototype.slice.call(arguments);

  args.shift(); // = level
  var levelIndex = this.levels.indexOf(level);
  var minimumIndex = this.levels.indexOf(this.level);

  if (levelIndex >= minimumIndex) {
    var nameString = (this.name && this.name.length) ?
      '[' + this.name + '] ' :
      '';
    var levelString = '[' + level + '] ';
    var messageString = util.format.apply(null, args);

    console.log(nameString + levelString + messageString);
  }
};

module.exports.Logger = Logger;
