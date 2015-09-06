'use strict'

var gulp = require('gulp')
var standard = require('gulp-standard')
var karma = require('karma').server

gulp.task('karma', function (done) {
  karma.start({
    configFile: __dirname + '/test/karma.conf.js',
    singleRun: true
  }, done)
})

gulp.task('standard', function () {
  return gulp.src(['./src/index.js', './test/*', 'gulpfile.js'])
  .pipe(standard())
  .pipe(standard.reporter('default', {
    breakOnError: true
  }))
})

gulp.task('test', ['standard', 'karma'])
