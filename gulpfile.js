'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var cover = require('gulp-coverage');
var jsdoc = require('gulp-jsdoc');
var _ = require('lodash');

var files = {
  lib: './lib/**/*.js',
  test: './test/**/*.js',
  gulpfile: './gulpfile.js'
};

files.all = _.values(files);

gulp.task('jshint', function () {
  return gulp.src(files.all)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-path-reporter'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('test', function () {
  return gulp.src(files.test, {read: false})
    .pipe(cover.instrument({
      pattern: [files.lib]
    }))
    .pipe(mocha({
      reporter: 'spec'
    }))
    .pipe(cover.gather())
    .pipe(cover.format({
      reporter: 'html',
      outFile: 'coverage.html'
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('jsdoc', function () {
  return gulp.src(files.lib)
    .pipe(jsdoc('./doc'));
});

gulp.task('default', ['jshint', 'test', 'jsdoc']);

if (!process.env.TRAVIS) {
  gulp.watch(files.all, ['jshint', 'test']);
  gulp.watch(files.lib, ['jsdoc']);
}
