var config        = require('../config')
if(!config.tasks.html) return

var gulp            = require('gulp')
var jade            = require('gulp-jade')
var changed         = require('gulp-changed')
var cached          = require('gulp-cached')
var jadeInheritance = require('gulp-jade-inheritance')
var gulpif          = require('gulp-if')
var filter          = require('gulp-filter')
var browserSync     = require('browser-sync')
var handleErrors    = require('../lib/handleErrors')
var path            = require('path')

var paths = {
  src: path.join(config.root.src, config.tasks.html.src, '/**/*.jade'),
  base: path.join(config.root.src, config.tasks.html.src),
  dest: path.join(config.root.dev, config.tasks.html.dest)
}

var htmlDevTask = function() {
  return gulp.src(paths.src)

    //only pass unchanged *main* files and *all* the partials
    .pipe(changed(paths.dest, {extension: '.html'}))

    //filter out unchanged partials, but it only works when watching
    .pipe(gulpif(global.isWatching, cached('jade')))

    //find files that depend on the files that have changed
    .pipe(jadeInheritance({basedir: paths.base}))
    .on('error', handleErrors)

    //filter out partials (folders and files starting with "_" )
    .pipe(filter(function (file) {
        return !/\/_/.test(file.path) && !/^_/.test(file.relative);
    }))

    //process jade templates
    .pipe(jade({
      pretty: true,
      locals: {env: 'stage'}
    }))
    .on('error', handleErrors)
    
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

gulp.task('dev:html', htmlDevTask)
module.exports = htmlDevTask