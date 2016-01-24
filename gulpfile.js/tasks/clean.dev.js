var config        = require('../config')

var gulp          = require('gulp')
var del           = require('del')

var cleanDevTask = function(cb) {
  del([ config.root.dev ]).then(function (paths) {
    cb()
  })
}

gulp.task('dev:clean', cleanDevTask)
module.exports = cleanDevTask