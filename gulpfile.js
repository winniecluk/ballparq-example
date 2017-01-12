var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('styles', function(){
  return gulp.src('public/css/*.css')
    .pipe(concat('all.css'))
    .pipe(gulp.dest('public'))
});

gulp.task('scripts', function(){
  return gulp.src(['public/js/app/app.module.js', 'public/js/app/app.routes.js', 'public/js/app/**/*.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('public'))
});

gulp.task('default', ['styles', 'scripts']);

gulp.watch(['public/css/**/*.css', 'public/js/**/*.js'], ['default'])
