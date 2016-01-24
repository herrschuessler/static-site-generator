var gulp            = require('gulp')
var runSequence     = require('run-sequence')

var devTask = function(cb) {
  runSequence(
    'dev:clean',
    ['dev:svg:css','dev:svg:symbol'],
    [ 'dev:css', 'dev:html', 'dev:js', 'dev:fonts', 'dev:images'],
    cb)
}

gulp.task('dev', devTask)
module.exports = devTask