var config        = require('../config')
if(!config.tasks.svgSprite.css) return

var gulp            = require('gulp')
var svgSprite       = require('gulp-svg-sprite')
var browserSync     = require('browser-sync')
var handleErrors    = require('../lib/handleErrors')
var path            = require('path')

var paths = {
  src: path.join(config.root.src, config.tasks.svgSprite.css.src, '*.svg'),
  dest: path.join(config.root.dev, config.tasks.css.dest),
  sprite: path.join('../', config.tasks.svgSprite.dest, 'sprite.svg'),
  scss: path.join('../../', config.root.src, config.tasks.svgSprite.css.scss),
  template: path.join(config.templates, 'svgSprite.template.scss')
}

var svgCssSpriteConfig = {
  svg: {
    "xmlDeclaration": false,
    "doctypeDeclaration": false,
    "namespaceIDs": false
  },
  mode: {
    css: {
      prefix: 'svg-%s',
      dimensions: true,
      dest: paths.dest,
      sprite: paths.sprite,
      render: {
        scss: {
          dest: paths.scss,
          template: paths.template
        }
      }
    }
  }
}

var svgCssSpriteDevTask = function() {
  return gulp.src(paths.src)
    .pipe(svgSprite(svgCssSpriteConfig))
    .on('error', handleErrors)
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream())
}

gulp.task('dev:svg:css', svgCssSpriteDevTask)
module.exports = svgCssSpriteDevTask