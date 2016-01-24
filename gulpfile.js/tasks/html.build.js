var config       = require('../config')
if(!config.tasks.html) return

var gulp         = require('gulp')
var jade         = require('gulp-jade')
var handleErrors = require('../lib/handleErrors')
var path         = require('path')

var paths = {
  src: path.join(config.root.src, config.tasks.html.src, '/**/!(_)*.jade'),
  dest: path.join(config.root.build, config.tasks.html.dest)
}

var htmlBuildTask = function() {
  return gulp.src(paths.src)
        .pipe(jade({
          pretty: true,
          locals: {env: 'build'}
        }))
        .on('error', handleErrors)
        .pipe(gulp.dest(paths.dest))
}

gulp.task('build:html', htmlBuildTask)
module.exports = htmlBuildTask