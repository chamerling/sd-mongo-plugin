//
// MongoDB plugin for Status Dashboard
//
// Christophe Hamerling <christophe.hamerling@gmail.com>
//

var mongoose = require('mongoose')

module.exports = function(statusdb) {
  console.log("Init status dashboard MongoDB client plugin");
  
  var api = statusdb.api;
  var settings = statusdb.settings;
  var conf = settings.plugins.mongo || { uri : 'mongodb://localhost:27017/statusdashboard', debug : true };
  mongoose.set('debug', conf.debug || true)

  mongoose.connect(conf.uri, function(err) {
    if (err) {
      throw err;
    }
    listen();
  });

  function listen() {
    require('./models/status');
     var Status = mongoose.model('Status')

    api.on('status', function(status) {
      Status.create(status, function(err, savedStatus) {
        if (err) {
          console.log('Error while saving status', err);
        } else {
          if (conf.debug) {
            console.log('Saved', savedStatus);
          }
        }
      });
    });
  }
}