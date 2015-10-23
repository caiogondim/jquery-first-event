'use strict'

var gulp = require('gulp')
var standard = require('gulp-standard')
var mocha = require('gulp-mocha')

gulp.task('standard', function () {
  return gulp.src(['./src/index.js', './test/*', 'gulpfile.js'])
  .pipe(standard())
  .pipe(standard.reporter('default', {
    breakOnError: true
  }))
})

gulp.task('mocha', ['standard'], function () {
  return gulp
    .src(['test/*.js'])
    .pipe(mocha())
})

gulp.task('test', ['standard', 'mocha'])
