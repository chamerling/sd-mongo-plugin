# Mongo plugin for Status Dashboard

Save Status Dashoard status updates to Mongo database.

## Howto

### Install

Install the 'sd-mongo-plugin' plugin in status dashboard as defined at https://github.com/obazoud/statusdashboard#external-plugins:

- Download/clone/install statusdashboard
- Install the plugin 'npm install sd-mongo-plugin'
- Add the plugin to the configuration file (plugins.json)

### Configure

Add the mongo information to the status dashboard settings:

    {
      plugins:
        mongo:
          uri : 'mongodb://localhost:27017/sd-mongo-plugin-sample',
          debug : true
    }

## Licence

MIT