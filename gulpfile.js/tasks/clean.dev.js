var config        = require('../config')

var gulp          = require('gulp')
var del           = require('del')
var path            = require('path')

var paths = {
  svgSpriteScss: path.join(config.root.src, config.tasks.svgSprite.css.scss),
}

var cleanDevTask = function(cb) {
  del([
    config.root.dev,
    paths.svgSpriteScss
  ]).then(function (paths) {
    cb()
  })
}

gulp.task('dev:clean', cleanDevTask)
module.exports = cleanDevTask