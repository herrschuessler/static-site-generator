var gulp            = require('gulp')
var runSequence     = require('run-sequence')

var devTask = function(cb) {
  runSequence(
    'dev:clean',
    'dev:svg',
    [ 'dev:css', 'dev:html', 'dev:js', 'dev:assets'],
    cb)
}

gulp.task('dev', devTask)
module.exports = devTask