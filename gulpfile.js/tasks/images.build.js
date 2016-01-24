var config      = require('../config')
if(!config.tasks.images) return

var browserSync = require('browser-sync')
var changed     = require('gulp-changed')
var gulp        = require('gulp')
var imagemin    = require('gulp-imagemin')
var path        = require('path')

var paths = {
  src: path.join(config.root.src, config.tasks.images.src, '/**'),
  dest: path.join(config.root.build, config.tasks.images.dest)
}

var imagesBuildTask = function() {
  return gulp.src(paths.src)
    .pipe(changed(paths.dest))
    .pipe(imagemin({
        progressive: true,
        multipass: true
    }))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

gulp.task('build:images', imagesBuildTask)
module.exports = imagesBuildTask