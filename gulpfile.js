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
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var filter = require('gulp-filter');
var rename = require('gulp-rename');


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
gulp.task('replace',['js','css'], function() {

  gulp.src('index.html')
    .pipe(htmlreplace({
        'css': 'dist/css/styles.min.css',
        'js': 'dist/js/all-min.js'
    }))
    .pipe(gulp.dest('./'));

});

//revision
gulp.task("rev", function() {
  var jsFilter = filter("**/*.js");
  var cssFilter = filter("**/*.css");

  var userefAssets = useref.assets();

  return gulp.src("index.html")
    .pipe(userefAssets)      // Concatenate with gulp-useref
    .pipe(jsFilter)
    .pipe(minify())             // Minify any javascript sources
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe(minifyCss())               // Minify any CSS sources
    .pipe(cssFilter.restore())
    .pipe(rev())                // Rename the concatenated files
    .pipe(userefAssets.restore())
    .pipe(useref())
    .pipe(revReplace())         // Substitute in new filenames
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./'));
});


gulp.task('build',['replace']);


//default
gulp.task('default',['sass','coffee']);
