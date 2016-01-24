var config      = require('../config')
if(!config.tasks.images) return

var browserSync = require('browser-sync')
var changed     = require('gulp-changed')
var gulp        = require('gulp')
var path        = require('path')

var paths = {
  src: path.join(config.root.src, config.tasks.images.src, '/**'),
  dest: path.join(config.root.dev, config.tasks.images.dest)
}

var imagesDevTask = function() {
  return gulp.src(paths.src)
    .pipe(changed(paths.dest))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

gulp.task('dev:images', imagesDevTask)
module.exports = imagesDevTask