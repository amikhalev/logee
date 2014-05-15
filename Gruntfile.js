var _ = require('lodash');

module.exports = function (grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');

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
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          require: ['should']
        },
        src: [files.test]
      }
    }
  });

  grunt.registerTask('test', ['mochaTest:test']);
  grunt.registerTask('default', ['jshint', 'test']);
  grunt.registerTask('travis', ['test']);
};
