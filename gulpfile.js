var gulp = require('gulp'),
  jade = require("gulp-jade"),
  sass = require('gulp-sass'),
  plumber = require('gulp-plumber'),
  browserSync = require('browser-sync'),
  notify = require('gulp-notify'), // send notifications to osx
  autoprefixer = require('gulp-autoprefixer'),
  jpegoptim = require('imagemin-jpegoptim'); //TODO: find out how to optomize this image

var reload = browserSync.reload;

var paths = {
  js: 'src/js/*.js',
  css: 'src/css/*.css',
  sass_src: 'src/sass/*.scss',
  jade: 'src/jade/index.jade',
  images: 'src/images/*.png'
};

var target = {
  css: 'dist/css',
  html: 'dist/',
  js: 'dist/js/',
  images: 'dist/images'
};

/*******************************************************************************
 JADE/HTML TASK
*******************************************************************************/
gulp.task('jade', function() {
  return gulp.src(paths.jade)
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./'))
    .pipe(reload({
      stream: true
    }))
    .pipe(notify({
      message: 'JADE processed!'
    }));
});

/*******************************************************************************
 CSS TASK
*******************************************************************************/

gulp.task('css', function() {
  return gulp.src(paths.css)
    .pipe(plumber())
    .pipe(gulp.dest(target.css))
    .pipe(reload({
      stream: true
    }))
    .pipe(notify({
      message: 'CSS processed!'
    }));
});

/*******************************************************************************
 SASS TASK
*******************************************************************************/

gulp.task('sass', function() {
  gulp.src(paths.sass_src) // get the files
    .pipe(plumber()) // make sure gulp keeps running on errors
    .pipe(sass()) // compile all sass
    .pipe(autoprefixer( // complete css with correct vendor prefixes
      'last 2 version',
      '> 1%',
      'ie 8',
      'ie 9',
      'ios 6',
      'android 4'
    ))
    .pipe(gulp.dest(target.css)) // where to put the file
    .pipe(reload({
      stream: true
    }))
    .pipe(notify({
      message: 'SCSS processed!'
    })); // notify when done
});

/*******************************************************************************
 *******************************************************************************/


/*******************************************************************************
 Javascript TASK
*******************************************************************************/
gulp.task('js', function() {
  return gulp.src(paths.js)
    .pipe(plumber())
    .pipe(gulp.dest(target.js))
    .pipe(notify({
      message: 'Javascript processed!'
    }));
});


/*******************************************************************************
 Images TASK
*******************************************************************************/


gulp.task('images', function() {
  gulp.src('src/images/**/*.{png,jpg,jpeg,gif,svg}')
    .pipe(gulp.dest('dist/images'));
});

/*******************************************************************************
 BROWSER SYNC
*******************************************************************************/

// Static server
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./"
    }
  });
});


gulp.task('default', ['browser-sync'], function() {
  gulp.run('jade', 'css', 'sass', 'js', 'images');

  gulp.watch(paths.sass_src, function() {
    gulp.run('sass');
    reload({
      stream: true
    });
  });

  gulp.watch(paths.jade, function() {
    gulp.run('jade');
    reload();
  });

  gulp.watch(paths.js, function() {
    gulp.run('js');
    reload();
  });

  gulp.watch(paths.images, function() {
    gulp.run('images');
    reload();
  });

  //TODO:add other tasks to be watched. CSS

});
