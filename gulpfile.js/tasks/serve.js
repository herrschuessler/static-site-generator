var config       = require('../config')

var gulp         = require('gulp')
var browserSync  = require('browser-sync')

var serveTask = function() {
  browserSync({
    server: {
      baseDir: config.root.dev,
      routes: {
        '/bower_components': 'bower_components'
      }
    },
    notify: false,
    reloadDelay: 100,
    ghostMode: false
  });
}

gulp.task('serve', ['watch'], serveTask)
module.exports = serveTask