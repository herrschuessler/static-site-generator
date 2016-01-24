var config        = require('../config')
if(!config.tasks.assets) return

var gulp          = require('gulp')
var imagemin      = require('gulp-imagemin')

var assetsBuildTask = function() {
  return gulp.src(config.tasks.assets.src, {base: config.root.src})
    .pipe(imagemin({
        progressive: true,
        multipass: true
    }))
    .pipe(gulp.dest(config.root.build))
}

gulp.task('build:assets', assetsBuildTask)
module.exports = assetsBuildTask