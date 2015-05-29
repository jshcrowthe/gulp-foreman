var http = require("http");

var server = http.createServer(function(req, res) {
  res.end("w00t");
});

server.listen(process.env.PORT, function() {
  console.log('====================');
  console.log('RUNNING SERVER 2');
  console.log('====================');
  
  console.log('Server Environtment:', process.env.TARGET_ENV);
  console.log("Server Port:", process.env.PORT);

  if (process.env.OTHER_VAR) {
    // Adding a space for display output
    console.log(' ');
    console.log('Additional Vars:');
    console.log('Other Var 1:', process.env.OTHER_VAR);
    console.log('Other Var 2:', process.env.OTHER_VAR_2);
  }
});