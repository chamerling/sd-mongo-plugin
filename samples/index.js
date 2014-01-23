//
// Sample using the plugin API and the mongo plugin.
//
// Christophe Hamerling <christophe.hamerling@gmail.com>
//

var plugin = require('../index');
var EventEmitter = require('events').EventEmitter;

var api = new EventEmitter();

var settings = {
  plugins : {
    mongo : {
      uri : 'mongodb://localhost:27017/sd-mongo-plugin-sample',
      debug : true
    }
  }
};

plugin({
  api : api,
  settings : settings
});

setInterval(function() {
  console.log('Generating new data');
  api.emit('refresh', { foo : 'bar'});
}, 1000);

setInterval(function() {
  console.log('Generating Status');
  api.emit('status', { status : '...'});
}, 2000);