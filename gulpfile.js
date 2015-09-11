//////////////////////////
// Vars
//////////////////////////

var gulp            = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins         = gulpLoadPlugins(),
    browserSync     = require('browser-sync'),
    del             = require('del'),
    runSequence     = require('run-sequence'),
    jshintStylish   = require('jshint-stylish');


var reload        = browserSync.reload,
    browsers      = ['> 1%','last 2 versions','ie 9'];

// Display error messages 
var onError = function (err) {  
      var fileName = 'undefined'; 
      if(err.fileName) {
        fileName = err.fileName.split("/").pop();
      }
      else if(err.path) {
        fileName = err.path.split("/").pop();
      }

      plugins.util.beep();
      plugins.util.log(plugins.util.colors.bgRed('ERROR') + ': ' + plugins.util.colors.yellow(err.plugin) + ' in ' + plugins.util.colors.yellow(fileName) + ' on line ' + plugins.util.colors.yellow(err.lineNumber))
      plugins.util.log(plugins.util.colors.red(err.message));

      this.emit('end');
    };

var dev = {
    root:         'src',
    scss:         'src/sass/**/*.scss',
    js:           'src/js/**/*.js',
    jade: {
      root:       'src/jade',
      src:        'src/jade/**/*.jade',
      pages:      'src/jade/**/!(_)*.jade'
    },
    svg: {
      css: {
        src:      'src/svg/css/*.svg'
      },
      symbol: {
        src:      'src/svg/symbol/*.svg'
      },
      scss:       'src/sass/svg/_sprites.scss',
      template:   'src/tasks/svg-sprites/_sprite_template.scss'
    },
    assets: [
      'src/img/**/*',
      'src/fonts/**/*',
      'src/docs/**/*',
      'src/_temp/**/*',
      'src/favicon.ico'
      ]
};

var stage = {
    root:         'stage',
    css:          'stage/css',
    js:           'stage/js',
    html:         'stage',
    svg:          'img/svg-sprites',
    assets:       'stage'
};

var build = {
    root:         'dist',
    css:          'dist/css',
    js: {
      folder:     'dist/js',
      file:       'app.js'
    },
    html: {
      folder:     'dist',
      files:      'dist/*.html'
    },
    assets:       'dist'
};

var svgConfigCss = {
  svg: {
    "xmlDeclaration": false,
    "doctypeDeclaration": false,
    "namespaceIDs": false
  },
  mode: {
    css: {
      dest: stage.css,
      prefix: 'svg-%s',
      dimensions: true,
      sprite: '../' + stage.svg + '/sprite.svg',
      render: {
        scss: {
          dest: '../../' + dev.svg.scss,
          template: dev.svg.template
        }
      }
    }
  }
};

var svgConfigSymbol = {
  svg: {
    "xmlDeclaration": false,
    "doctypeDeclaration": false,
    "namespaceIDs": false
  },
  mode: {
    symbol: {
      dest: stage.root,
      sprite: stage.svg + '/symbol.svg'
    }
  }
};

//////////////////////////
// Stage
//////////////////////////

// Sass Task
gulp.task('stage:css', function () {
  return gulp.src(dev.scss)
      .pipe(plugins.changed(stage.css))
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sass({
        outputStyle: 'nested'
      }))
      .on('error', onError)
      .pipe(plugins.autoprefixer({
        browsers: browsers,
        cascade: false
      }))
      .pipe(plugins.sourcemaps.write())
      .pipe(gulp.dest(stage.css))
      .pipe(reload({stream: true}));
});

// JS Task
gulp.task('stage:js', function () {
  return gulp.src(dev.js)
      .pipe(plugins.changed(stage.js))
      .pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter(jshintStylish))
      .pipe(gulp.dest(stage.js))
      .pipe(reload({stream: true}));
});

// Jade Task
gulp.task('stage:html', function() {
  return gulp.src(dev.jade.src)
        .pipe(plugins.changed(stage.html, {extension: '.html'}))
        .pipe(plugins.if(global.isWatching, plugins.cached('jade')))
        .pipe(plugins.jadeInheritance({basedir: dev.jade.root}))
        .pipe(plugins.filter(function (file) {
            return !/\/_/.test(file.path) && !/^_/.test(file.relative);
        }))
        .pipe(plugins.jade({
          pretty: true
        }))
        .on('error', onError)
        .pipe(gulp.dest(stage.html))
        .pipe(reload({stream: true}));
});

// SVG Sprite Task
gulp.task('stage:svg:css', function () {
  return gulp.src(dev.svg.css.src)
      .pipe(plugins.svgSprite(svgConfigCss))
      .on('error', onError)
      .pipe(gulp.dest('./'))
      .pipe(reload({stream: true}));
});

gulp.task('stage:svg:symbol', function () {
  return gulp.src(dev.svg.symbol.src)
      .pipe(plugins.svgSprite(svgConfigSymbol))
      .on('error', onError)
      .pipe(gulp.dest('./'))
      .pipe(reload({stream: true}));
});

gulp.task('stage:svg', function(cb) {
  runSequence(
    [ 'stage:svg:css', 'stage:svg:symbol'],
    cb);
});

var svgoptions = {
  plugins: [
    {
      mergePaths: false,
      collapseGroups: false,
      convertTransform: false,
       removeDoctype: false
     }
  ]
};

// Assets Task
gulp.task('stage:assets', function () {
  return gulp.src(dev.assets, {base: dev.root})
    .pipe(gulp.dest(stage.assets));
});

// Clean stage task
gulp.task('stage:clean', function (cb) {
  del([
    stage.root,
    dev.svg.scss
  ], cb);
});


//////////////////////////
// Build
//////////////////////////

// Sass Task
gulp.task('build:css', function () {
  return gulp.src(dev.scss)
      .pipe(plugins.sass({
        outputStyle: 'compressed',
        errLogToConsole: true
      }))
      .pipe(plugins.autoprefixer({
        browsers: browsers,
        cascade: false
      }))
      .pipe(gulp.dest(build.css));
});

// JS Task
gulp.task('build:js', ['build:html'], function () {
  var assets = plugins.useref.assets({searchPath: dev.root});

  return gulp.src(build.html.files)
      .pipe(assets)
      .pipe(plugins.if('*.js', uglify()))
      .pipe(assets.restore())
      .pipe(plugins.useref())
      .pipe(gulp.dest(build.html.folder));
});

// Jade Task
gulp.task('build:html', function() {
  return gulp.src(dev.jade.pages)
        .pipe(plugins.jade({
          pretty: true
        }))
        .on('error', onError)
        .pipe(gulp.dest(build.html.folder));
});

// SVG Task
gulp.task('build:svg', function () {
  return gulp.src(stage.root + '/' + stage.svg + '/**/*', {base: stage.root})
    .pipe(gulp.dest(build.assets));
});

// Assets Task
gulp.task('build:assets', function () {
  return gulp.src(dev.assets, {base: dev.root})
    .pipe(plugins.imagemin({
      progressive: true
    }))
    .pipe(gulp.dest(build.assets));
});

// Clean Build Task
gulp.task('build:clean', function (cb) {
  del([
    build.root
  ], cb);
});


//////////////////////////
// Main Tasks
//////////////////////////

// Start Staging Server
gulp.task('serve', ['watch'], function() {
  browserSync({
    server: {
      baseDir: 'stage',
      routes: {
        '/bower_components': 'bower_components'
      }
    },
    notify: false,
    reloadDelay: 500,
    ghostMode: false
  });
});

// Start watching for changes
gulp.task('watch:start', function() {
    global.isWatching = true;
});

gulp.task('watch',['watch:start'], function() {
  gulp.watch(dev.scss, ['stage:css']);
  gulp.watch(dev.jade.src, ['stage:html']);
  gulp.watch(dev.js, ['stage:js']);
  gulp.watch(dev.svg.css.src, ['stage:svg:css']);
  gulp.watch(dev.svg.symbol.src, ['stage:svg:symbol']);
  gulp.watch(dev.assets, ['stage:assets']);
});

// Stage Task
gulp.task('stage', function(cb) {
  runSequence(
    'stage:clean',
    'stage:svg',
    [ 'stage:css', 'stage:html', 'stage:js', 'stage:assets'],
    cb);
});

// Build Task
gulp.task('build', function(cb) {
  runSequence(
    ['build:clean','stage'],
    [ 'build:css', 'build:js', 'build:svg', 'build:assets'], // html is built by task build:js
    cb);
});

// Default Task
gulp.task('default', function(cb) {
  runSequence(
    'stage',
    'serve',
    cb);
});


//////////////////////////
// Component Tasks
//////////////////////////

// copy vendor files to project folder
gulp.task('copy:vendor', function() {
  
  // normalize.css
  gulp.src(['bower_components/normalize.css/normalize.css'])
  .pipe(plugins.rename('_normalize.scss'))
  .pipe(gulp.dest('src/sass/vendor-bower'));

});
