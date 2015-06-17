var gulp = require('gulp');
var server = require('gulp-server-livereload');
var sass = require('gulp-sass');
var coffee = require('gulp-coffee');
var watch = require('gulp-watch');
var gutil = require('gutil');


//coffee
gulp.task('coffee', function() {
  gulp.src('./src/coffee/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./src/js'))
});


//SASS
gulp.task('sass', function () {
  gulp.src('./src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/sass/*.scss', ['sass']);
});




//WATCH
gulp.task('watch-cf', function () {
    watch('./src/coffee/*.coffee', function () {
        gulp.start('coffee');
    });
});




//SERVER
gulp.task('server', function() {
  gulp.src('/.')
    .pipe(server({
      livereload: true,
      directoryListing: true,
      open: true,
      port: 3030,
      defaultFile: 'index.html'
    }));
});


//

//default
gulp.task('default',['sass','coffee']);
