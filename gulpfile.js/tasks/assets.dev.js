var config        = require('../config')
if(!config.tasks.assets) return

var gulp          = require('gulp')
var browserSync   = require('browser-sync')

var assetsDevTask = function() {
  return gulp.src(config.tasks.assets.src, {base: config.root.src})
    .pipe(gulp.dest(config.root.dev))
    .pipe(browserSync.stream())
}

gulp.task('dev:assets', assetsDevTask)
module.exports = assetsDevTask