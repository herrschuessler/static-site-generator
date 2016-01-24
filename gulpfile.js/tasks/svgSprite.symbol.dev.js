var config        = require('../config')
if(!config.tasks.svgSprite.symbol) return

var gulp            = require('gulp')
var svgSprite       = require('gulp-svg-sprite')
var browserSync     = require('browser-sync')
var handleErrors    = require('../lib/handleErrors')
var path            = require('path')

var paths = {
  src: path.join(config.root.src, config.tasks.svgSprite.symbol.src, '*.svg'),
  dest: path.join(config.tasks.svgSprite.dest, 'symbol.svg')
}

var svgConfigSymbol = {
  svg: {
    "xmlDeclaration": false,
    "doctypeDeclaration": false,
    "namespaceIDs": false
  },
  mode: {
    symbol: {
      dest: config.root.dev,
      sprite: paths.dest
    }
  }
}

var svgSymbolSpriteDevTask = function(cb) {
  return gulp.src(paths.src)
    .pipe(svgSprite(svgConfigSymbol))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.root.dev))
    .pipe(browserSync.stream())
}

gulp.task('dev:svg:symbol', svgSymbolSpriteDevTask)
module.exports = svgSymbolSpriteDevTask