var config        = require('../config')
if(!config.tasks.svgSprite) return

var gulp            = require('gulp')
var browserSync     = require('browser-sync')
var path            = require('path')

var svgSpriteDevTask = function(cb) {

}

gulp.task('dev:svgSprite', svgSpriteDevTask)
module.exports = svgSpriteDevTask