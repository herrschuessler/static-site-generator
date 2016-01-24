var config        = require('../config')

var gulp          = require('gulp')
var del           = require('del')
var path            = require('path')

var paths = {
  svgSpriteCss: path.join(config.root.src, config.tasks.svgCssSprite.css)
}

var cleanDevTask = function(cb) {
  del([
    config.root.dev,
    paths.svgSpriteCss
  ]).then(function (paths) {
    cb()
  })
}

gulp.task('dev:clean', cleanDevTask)
module.exports = cleanDevTask