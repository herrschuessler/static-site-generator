var gulp         = require('gulp')

var watchStartTask = function() {
  global.isWatching = true;
}

gulp.task('watch:start', watchStartTask)
module.exports = watchStartTask