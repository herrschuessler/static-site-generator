var config        = require('../config')
if(!config.tasks.svgCssSprite) return

var gulp          = require('gulp')
var path          = require('path')

var paths = {
  src: path.join(config.root.dev, config.tasks.svgCssSprite.dest, '*.svg')
}

var svgCssSpriteBuildTask = function() {
  return gulp.src(paths.src, {base: config.root.dev})
    .pipe(gulp.dest(config.root.build))
}

gulp.task('build:svg:css', ['dev:svg:css'], svgCssSpriteBuildTask)
module.exports = svgCssSpriteBuildTask