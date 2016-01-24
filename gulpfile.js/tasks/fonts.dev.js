var config        = require('../config')
if(!config.tasks.fonts) return

var gulp          = require('gulp')
var changed       = require('gulp-changed')
var browserSync   = require('browser-sync')
var path          = require('path')

var paths = {
  src: path.join(config.root.src, config.tasks.fonts.src, '/**/*'),
  dest: path.join(config.root.dev, config.tasks.fonts.dest)
}

var fontsDevTask = function() {
  return gulp.src(paths.src)
    .pipe(changed(paths.dest))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

gulp.task('dev:fonts', fontsDevTask)
module.exports = fontsDevTask