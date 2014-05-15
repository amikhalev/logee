/**
 * @file logee.js Core file that includes everything from logee
 *
 * (c) 2014 Alex Mikhalev
 * Under the MIT License
 */

'use strict';

/**
 * @module logee
 * Library for logging
 */
var logee = {};

// Expose public classes

/**
 * The class used to send log messages
 * @type {Logger}
 */
logee.Logger = require('./logee/logger').Logger;

module.exports = logee;
