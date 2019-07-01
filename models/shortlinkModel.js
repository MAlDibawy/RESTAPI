var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var shortlinkSchema = new Schema({
	slug: String,
	ios: {
		primary:String,
		fallback:String
	},
	android: {
		primary:String,
		fallback: String
	},
	web: String
});

var shortlink = module.exports = mongoose.model('Shortlink', shortlinkSchema);

module.exports.listAll = (callback) => {
	shortlink.find(callback);
};

module.exports.createShortlink = (link, callback) => {
	shortlink.create(link, callback);
};


module.exports.updatelink = (slug, link, options, callback) => {
	shortlink.findOneAndUpdate(slug, link, options, callback);
};