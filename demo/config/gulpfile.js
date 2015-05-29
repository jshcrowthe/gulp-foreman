var gulp = require('gulp');
var foreman = require('../../index.js');

gulp.task('demo:port', function (argument) {
  // Port defined here will supercede that of an ENV file
  foreman({
    port: 3000
  });
});

gulp.task('demo:procfile', function (argument) {
  // Port defined here will supercede that of an ENV file
  foreman({
    procfile: 'Procfile2.dev'
  });
});