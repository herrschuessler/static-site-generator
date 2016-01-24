var gulp            = require('gulp')
var runSequence     = require('run-sequence')

var defaultTask = function(cb) {
  runSequence(
    'dev',
    'serve',
    cb)
}

gulp.task('default', defaultTask)
module.exports = defaultTask