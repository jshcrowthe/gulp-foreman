var through = require("through2");
var gutil = require("gulp-util");
var PluginError = gutil.PluginError;
var PLUGIN_NAME = 'gulp-foreman';
var spawn = require("child_process").spawn;
var which = require('which');

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
  var foreman = spawn(command, buildArgs(config), config['options']);

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
};

function buildArgs(config) {
  var args = ["start"];

  if (!config || typeof config !== 'object') config = {};

  args = args.concat(Object.keys(config).map(function(val) {
    val = val.toLowerCase();
    if (val === 'options') return '';
    if (val === 'env' && Array.isArray(config[val])) config[val] = config[val].join(',');
    return [('--' + val), config[val]];
  })).reduce(function(container, val) {
    if (Array.isArray(val)) return container.concat(val);
    container.push(val);
    return container;
  }, []);
  return args;
}
