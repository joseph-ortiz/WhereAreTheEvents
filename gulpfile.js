var gulp = require('gulp');
var jade = require("gulp-jade");


var paths = {
  js: 'src/js/*.js',
  templates: 'src/*.jade/*.jade',
  css: 'src/css/*.css'
};

gulp.task('templates', function() {
  return gulp.src('src/index.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('css', function(){
  return gulp.src(paths.css)
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('js', function(){
  return gulp.src('src/js/*.js')
    .pipe(gulp.dest('dist/js/'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.templates, ['templates']);
});


gulp.task('default', ['templates', 'css', 'js']);
