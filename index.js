//
// MongoDB plugin for Status Dashboard
//
// Christophe Hamerling <christophe.hamerling@gmail.com>
//

module.exports = function(statusdb) {
  console.log("Init status dashboard MongoDB client plugin");
  
  var api = statusdb.api;
  var settings = statusdb.settings;
  var conf = settings.plugins.mongo || { uri : '', debug : true, };
  mongoose.set('debug', conf.debug || true)
  mongoose.connect(conf.uri);
  
  require('./models/status');
  var mongoose = require('mongoose')
    , Status = mongoose.model('Status')
      
  api.on('refresh', function(status) {
    socket.emit('refresh', status);
  });

  api.on('status', function(status) {
    Status.create(status, function(err, savedStatus) {
      if (err) {
        console.log('Error while saving status', err);
      }
    });
  });
}