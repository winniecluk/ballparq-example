var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('scripts', function(){
  return gulp.src(['../client/js/app.js', '../client/js/**/*.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('public/javascripts'));
});

gulp.task('styles', function(){
  return gulp.src('../client/css/*.css')
    .pipe(concat('all.css'))
    .pipe(gulp.dest('public/stylesheets'));
})

gulp.task('default', ['scripts', 'styles']);

gulp.watch(['../client/css/*.css', '../client/js/**/*.js'], ['default'])
