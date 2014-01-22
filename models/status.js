
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var StatusSchema = new Schema({
  created_at : { type : Date, default: Date.now }
  },
  {
    strict : false
  }
);

StatusSchema.pre('save', function(next) {
  console.log('Saving status', this);
  next();
});

/**
 * Statics
 *
 * @type {{load: Function, list: Function}}
 */
StatusSchema.statics = {

  /**
   * Find status by id
   *
   * @param {ObjectId} id
   * @param {Function} cb
   * @api private
   */
  load: function (id, cb) {
    this.findOne({ _id : id })
      .exec(cb)
  },

  /**
   * Get a list of status based on criteria
   *
   * @param options
   * @param cb
   */
  list: function (options, cb) {
    var criteria = options.criteria || {}

    this.find(criteria)
      .sort({'created_at': -1}) // sort by date
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb)
  }
}

StatusSchema.plugin(require('mongoose-lifecycle'));
module.exports = mongoose.model('Status', StatusSchema);