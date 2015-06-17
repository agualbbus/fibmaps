var gulp = require('gulp');
var server = require('gulp-server-livereload');
var sass = require('gulp-sass');
var coffee = require('gulp-coffee');
var watch = require('gulp-watch');
var gutil = require('gutil');
var htmlreplace = require('gulp-html-replace');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var ghtmlSrc = require('gulp-html-src');
var minifyCss = require('gulp-minify-css');


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


//js

gulp.task('js',function(){
    gulp.src('index.html')
        .pipe(ghtmlSrc())
        .pipe(concat('all.js'))
        .pipe(minify())
        .pipe(gulp.dest('dist/js/'))
});



//css
gulp.task('css',function(){
    gulp.src('index.html')
        .pipe(ghtmlSrc({ presets: 'css'}))
        .pipe(concat('styles.min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css/'))
});



//replace task
gulp.task('replace',['js'], function() {

  gulp.src('index.html')
    .pipe(htmlreplace({
        'css': 'dist/css/styles.min.css',
        'js': 'dist/js/all-min.js'
    }))
    .pipe(gulp.dest('./'));

});

//default
gulp.task('default',['sass','coffee']);
