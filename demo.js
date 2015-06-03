var gulp = require('gulp');
var foreman = require('gulp-foreman');

gulp.task('server', function() {
    console.log('new server');
    return foreman({
        procfile: path.join(__dirname, 'Procfile'),
        port: 2000,
        env: path.join(__dirname, '.env')
    });
});

gulp.task('server:reset', function(){
    setInterval(function(){
        console.log('runnn');
        gulp.start('server');
    }, 2000);
});
