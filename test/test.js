var assert = require('assert'),
		db = require('../lib');



describe('basic mongo tests', function() {

	it('should connect to mongo localhost by default', function(done) {

		db.connect(function(err) {
			done(err);
		});

	});

	it('should connect to mongo localhost', function(done) {

		db.connect('localhost', function(err) {
			done(err);
		});

	});
});

