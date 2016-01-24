var config        = require('../config')
if(!config.tasks.svgSymbolSprite) return

var gulp          = require('gulp')
var path          = require('path')

var paths = {
  src: path.join(config.root.dev, config.tasks.svgSymbolSprite.dest, '*.svg')
}

var svgSymbolSpriteBuildTask = function() {
  return gulp.src(paths.src, {base: config.root.dev})
    .pipe(gulp.dest(config.root.build))
}

gulp.task('build:svg:symbol', ['dev:svg:symbol'], svgSymbolSpriteBuildTask)
module.exports = svgSymbolSpriteBuildTask