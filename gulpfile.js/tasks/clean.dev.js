var gulp            = require('gulp')
var del             = require('del')
var path            = require('path')

var paths = {
  root: path.join(config.root.dev)
}
var cleanDevTask = function(cb) {
  del([
    paths.root
  ]);
}

gulp.task('dev:clean', cleanDevTask)
module.exports = cleanDevTask