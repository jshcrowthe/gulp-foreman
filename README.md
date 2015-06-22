gulp-foreman
=======================

This is a small foreman runner built for use with `gulp` (although it can be used outside of gulp as well).
## Install
Install this plugin by running the following command at your terminal
```bash
npm i -S gulp-foreman
```

## Example Usage
The following are a different ways to use the plugin

### Default
Default usage is simple:

```javascript
var gulp = require('gulp');
var foreman = require('gulp-foreman');

gulp.task('default', function (argument) {
  foreman();
});
```

You can provide a `.env` file in the same dir as your `gulpfile.js` that will be used to configure the environment of your process.

### Configuration
You can also pass a configuration object with several params:

- **procfile**: You can pass a string to this to specify the procfile used.
- **env**: You can pass a string, or an array of strings, to define and configure the environment.
- **port**: You can pass a number to define the default port. _NOTE: If you pass this param it will supercede any value passed in a .ENV file_
- **options**: You can pass a hash of options for use when spawning the foreman child process, such as setting the working directory.

**Procfile Config**

```javascript
var gulp = require('gulp');
var foreman = require('gulp-foreman');

gulp.task('default', function (argument) {
  foreman({
    procfile: 'Procfile.dev'
  });
});
```

**Env Config**

```javascript
var gulp = require('gulp');
var foreman = require('gulp-foreman');

gulp.task('default', function (argument) {
  foreman({
    env: 'beta.env',
    // You can also pass an array like below and all envs will be included
    // env: ['beta.env', 'beta_test.env'] 
  });
});
```

**Port Config**

```javascript
var gulp = require('gulp');
var foreman = require('gulp-foreman');

gulp.task('default', function (argument) {
  foreman({
    port: 80
  });
});
```

**Options Config**

```javascript
var gulp = require('gulp');
var foreman = require('gulp-foreman');

gulp.task('default', function(argument) {
  foreman({
    options: { cwd: 'path/to/working/directory' }
  });
});
```

## License

MIT
