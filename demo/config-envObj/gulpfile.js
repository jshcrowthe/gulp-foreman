var gulp = require('gulp');
var foreman = require('../../index.js');

gulp.task('default', function (argument) {
  foreman({
    envObj: {
      TARGET_ENV:'SUPERMAN',
      PORT:1337
    },
  });
});