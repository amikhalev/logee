var _ = require('lodash');

module.exports = function (grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-cov');

  var files = {
    lib: './lib/**/*.js',
    test: './test/**/*.js',
    gruntfile: './Gruntfile.js'
  };
  files.all = _.values(files);

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: true
      },
      all: files.all
    },
    mochacov: {
      options: {
        files: files.test
      },
      test: {
        options: {
          reporter: 'spec'
        }
      },
      coverage: {
        options: {
          coveralls: true
        }
      }
    }
  });

  grunt.registerTask('travis', ['mochacov:test', 'mochacov:coverage']);
  grunt.registerTask('test', ['mochacov:test']);
  grunt.registerTask('default', ['jshint', 'test']);
};
