var through = require("through2");
var gutil = require("gulp-util");
var PluginError = gutil.PluginError;
var PLUGIN_NAME = 'gulp-foreman';
var spawn = require("child_process").spawn;
var which = require('which');
var temp = require('temp').track();
var fs = require('fs');

var objToKeyValString = function(obj) {
  obj = obj && typeof obj === 'object' ? obj : {};
  return Object.keys(obj).reduce(function(string, key) {
    string += key;
    string += '=';
    string += obj[key];
    string += '\n';
    return string;
  }, '');
};

var notEnvObj = function(val) { return val !== 'envObj' };

var formatArgs = function(config){
  return function(val) {
    val = val.toLowerCase();
    if (val === 'env' && Array.isArray(config[val])) config[val] = config[val].join(',');
    return [('--' + val), config[val]];
  };
};

var mergeOrAddToArray = function(container, val) {
  if (Array.isArray(val)) return container.concat(val);
  container.push(val);
  return container;
};

var buildArgs = function(config) {
  if (!config || typeof config !== 'object') config = {};

  // Validate we have passed a non-null object 
  if (config.envObj && typeof config.envObj === 'object') {
    // Create a temporary ENV file
    var tempFileObj = temp.openSync('gulp-foreman-env');

    // Build the ENV file from the passed object
    var contents = objToKeyValString(config.envObj);
    fs.writeFileSync(tempFileObj.path, contents, 'utf8');

    // Set the location of the env to the new path
    config.env = tempFileObj.path
  }

  var args = ['start'].concat(Object.keys(config).filter(notEnvObj).map(formatArgs(config))).reduce(mergeOrAddToArray, []);
  return args;
};

module.exports = function(config) {
  var command = "foreman";
  var path;
  try {
    path = command = which.sync(command);
  } catch(e1) {
    console.log('No "foreman" process available trying "nf" (node-foreman)');
    try {
      command = 'nf';
      path = command = which.sync(command);
    } catch(e2) {
      throw new PluginError(PLUGIN_NAME, 'gulp-foreman: No available "foreman" command found. Please install foreman then try again\n\nEASY INSTALL: npm install -g foreman');
    }
  }
  console.log('Using executable "' + path + '" to run app');
  var foreman = spawn(command, buildArgs(config));

  foreman.stdout.pipe(process.stdout);
  foreman.stderr.pipe(process.stderr);
  process.stdin.pipe(foreman.stdin);

  foreman.on("exit", function(code) {
    if (code > 0) {
      throw new PluginError(PLUGIN_NAME, 'gulp-foreman: Process exited with error(' + code + ')');
    }
    console.log('Goodbye');
    process.exit();
  });

  return foreman;
};
