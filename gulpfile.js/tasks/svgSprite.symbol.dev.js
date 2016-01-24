var config        = require('../config')
if(!config.tasks.svgSymbolSprite) return

var gulp            = require('gulp')
var svgSprite       = require('gulp-svg-sprite')
var browserSync     = require('browser-sync')
var handleErrors    = require('../lib/handleErrors')
var path            = require('path')

var paths = {
  src: path.join(config.root.src, config.tasks.svgSymbolSprite.src, '*.svg'),
  sprite: path.join(config.tasks.svgSymbolSprite.dest, 'symbol.svg')
}

var svgSymbolSpriteConfig = {
  svg: {
    "xmlDeclaration": false,
    "doctypeDeclaration": false,
    "namespaceIDs": false
  },
  mode: {
    symbol: {
      dest: config.root.dev,
      sprite: paths.sprite
    }
  }
}

var svgSymbolSpriteDevTask = function() {
  return gulp.src(paths.src)
    .pipe(svgSprite(svgSymbolSpriteConfig))
    .on('error', handleErrors)
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream())
}

gulp.task('dev:svg:symbol', svgSymbolSpriteDevTask)
module.exports = svgSymbolSpriteDevTask