var gulp            = require('gulp')
var runSequence     = require('run-sequence')

var buildTask = function(cb) {
  runSequence(
    'clean:build',
    'svgSprite:build',
    [ 'css:build', 'html:build', 'js:build', 'assets:build'],
    cb)
}

gulp.task('build', buildTask)
module.exports = buildTask