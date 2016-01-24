var config        = require('../config')

var gulp          = require('gulp')
var del           = require('del')

var cleanBuildTask = function() {
  del([ config.root.build ]).then(function (paths) {
    cb()
  })
}

gulp.task('build:clean', cleanBuildTask)
module.exports = cleanBuildTask