var config = require('../config')
var gulp   = require('gulp')
var path   = require('path')
var watch  = require('gulp-watch')

var watchTask = function() {
  var watchableTasks = ['css', 'html', 'js', 'svgSymbolSprite', 'svgCssSprite', 'fonts', 'images']

  watchableTasks.forEach(function(taskName) {
    var task = config.tasks[taskName]
    if(task) {
      var glob = path.join(config.root.src, task.src, '**/*.{' + task.extensions.join(',') + '}')
      watch(glob, function() {
       require('./' + taskName + '.dev')()
      })
    }
  })
}

gulp.task('watch', watchTask)
module.exports = watchTask