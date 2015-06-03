var through = require("through2");
var gutil = require("gulp-util");
var PLUGIN_NAME = 'gulp-foreman';
var spawn = require("child_process").spawn;
var which = require('which');
var log = gutil.log.bind(null, gutil.colors.cyan('foreman'));
module.exports = function(config) {
  var command = "foreman";
  var path;
  try {
    path = which.sync(command);
  } catch(e1) {
    log('No "foreman" process available trying "nf" (node-foreman)');
    try {
      command = 'nf';
      path = which.sync(command);
    } catch(e2) {
      throw new gutil.PluginError(PLUGIN_NAME, 'gulp-foreman: No available "foreman" command found. Please install foreman then try again\n\nEASY INSTALL: npm install -g foreman');
    }
  }
  log('Using executable "' + path + '" to run app')
  var foreman = spawn(command, buildArgs(config));
  foreman.stdout.on('data', function(data){
    log(data.toString('utf8').trim());
  });
  foreman.stderr.on('data', function(data){
    log(data.toString('utf8').trim())
  });

  foreman.on("exit", function(code) {
    if (code > 0)
      throw new gutil.PluginError(PLUGIN_NAME, 'gulp-foreman: Process exited with error(' + code + ')');
  });
  return through(function(chunk, enc, callback){
    console.log('ok', arguments);
    console.log(this);
  });
};

function buildArgs(config) {
  var args = ["start"];

  if (!config || typeof config !== 'object') config = {};

  args = args.concat(Object.keys(config).map(function(val) {
    val = val.toLowerCase();
    if (val === 'env' && Array.isArray(config[val])) config[val] = config[val].join(',');
    return [('--' + val), config[val]];
  })).reduce(function(container, val) {
    if (Array.isArray(val)) return container.concat(val);
    container.push(val);
    return container;
  }, []);
  return args;
}