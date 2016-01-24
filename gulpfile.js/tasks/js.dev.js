var config       = require('../config')
if(!config.tasks.js) return

var gulp         = require('gulp')
var browserSync  = require('browser-sync')
var handleErrors = require('../lib/handleErrors')
var path         = require('path')

var paths = {
  src: path.join(config.root.src, config.tasks.js.src, '/**/*'),
  dest: path.join(config.root.dev, config.tasks.js.dest)
}

var jsDevTask = function() {
  return gulp.src(paths.src)
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

gulp.task('dev:js', jsDevTask)
module.exports = jsDevTask