var config       = require('../config')
if(!config.tasks.css) return

var gulp         = require('gulp')
var sass         = require('gulp-sass')
var sassGlob     = require('gulp-sass-glob')
var handleErrors = require('../lib/handleErrors')
var autoprefixer = require('gulp-autoprefixer')
var path         = require('path')

var paths = {
  src: path.join(config.root.src, config.tasks.css.src, '/**/*.scss'),
  dest: path.join(config.root.build, config.tasks.css.dest)
}

var cssBuildTask = function() {
  return gulp.src(paths.src)
    .pipe(sassGlob())
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .on('error', handleErrors)
    .pipe(autoprefixer(config.tasks.css.autoprefixer))
    .pipe(gulp.dest(paths.dest))
}

gulp.task('build:css', cssBuildTask)
module.exports = cssBuildTask