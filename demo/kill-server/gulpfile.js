var gulp = require('gulp');
var foreman = require('../../index.js');
var gutil = require('gulp-util');

gulp.task('default', function (argument) {
  server = foreman();

  return gulp.src('*')
    .pipe(gutil.noop())
    .on('end', function() { server.kill(); });
});
