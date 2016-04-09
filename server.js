'use strict';

var staticServer = require('node-static');

var fileServer = new staticServer.Server('./public');

require('http').createServer(function (request, response) {
  request.addListener('end', function () {
    fileServer.serve(request, response);
  }).resume();
}).listen(process.env.PORT || 8080); // eslint-disable-line no-process-env
