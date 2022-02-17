const gulp = require('gulp')
const plumber = require('gulp-plumber')
const webpack = require('webpack-stream')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin")
const eslint = require('gulp-eslint')

// more odd libs
module.exports = function libs() {
  return gulp.src('src/libs/**/*')
    .pipe(gulp.dest('build/libs'))
}

