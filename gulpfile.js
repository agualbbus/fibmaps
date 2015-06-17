var gulp = require('gulp');
var server = require('gulp-server-livereload');
var sass = require('gulp-sass');
var coffee = require('gulp-coffee');
var watch = require('gulp-watch');
var gutil = require('gutil');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var filter = require('gulp-filter');
var copy = require('gulp-copy')



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





//copy fonts
gulp.task('fonts', function(){

    return gulp.src('./src/css/fonts/*')
    .pipe(copy('./dist',{prefix: 2  }))

});


//revision
gulp.task("rev", function() {
  var jsFilter = filter("**/*.js");
  var cssFilter = filter("**/*.css");

  var userefAssets = useref.assets();

  return gulp.src("./index.html")
    .pipe(userefAssets)      // Concatenate with gulp-useref
    .pipe(jsFilter)
    .pipe(uglify()).on('error', console.error.bind(console))
    // Minify any javascript sources
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe(minifyCss())               // Minify any CSS sources
    .pipe(cssFilter.restore())
    .pipe(rev())                // Rename the concatenated files
    .pipe(userefAssets.restore())
    .pipe(useref())
    .pipe(revReplace())         // Substitute in new filenames
    //.pipe(rename('index.html'))
    .pipe(gulp.dest('./'));
});


gulp.task('build',['rev','fonts']);


//default
gulp.task('default',['sass','coffee']);
