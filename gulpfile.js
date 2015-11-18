'use strict'

const gulp = require('gulp')
const standard = require('gulp-standard')
const mocha = require('gulp-mocha')
const header = require('gulp-header')
const pkg = require('./package.json')

// Test
// ----

gulp.task('standard', () => {
  return gulp.src(['./src/index.js', './test/*', 'gulpfile.js'])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true
    }))
})

gulp.task('mocha', ['standard'], () => {
  return gulp
    .src(['test/*.js'])
    .pipe(mocha())
})

gulp.task('test', ['standard', 'mocha'])

// Build
// -----

gulp.task('build', () => {
  const banner = [
    '/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' *',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @author <%= pkg.author %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''].join('\n')

  return gulp.src('./src/index.js')
    .pipe(header(banner, {pkg}))
    .pipe(gulp.dest('./dist'))
})
