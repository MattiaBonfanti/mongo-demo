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

describe('basic crud tests', function() {
  var _id;

  it('should save a document', function(done) {

    var data = {
      paramX: 50,
      paramY: 100
    };

    db.saveData(data, function(err, result) {
      if (err) return done(err);

      // the result is the document, including _id
      console.log(result);
      _id = result[0]._id;
      console.log(_id);

      done();

    });

  });

  it('should find a document', function(done) {

    var query = {
      paramX: 50
    };

    db.findOneData(query, function(err, result) {
      if (err) return done(err);

      // the result is the document
      console.log(result);
      assert(result._id.equals(_id), "id didn't match");

      done();
    });
  });

  it('should update a single document', function(done) {
    var query = {
      _id: _id
    };

    var update = {
      paramX: 500,
      paramY: 1000
    };

    db.updateOneData(query, update, function(err, result) {
      if (err) return done(err);

      // the result is the document
      console.log(result);
      assert(result._id.equals(_id), "id didn't match");
      assert.equal(result.paramX, 500);
      assert.equal(result.paramY, 1000);

      done();
    });
  });

  it('should update multiple documents', function(done) {
    // insert another doc that also has a paramX property set to 500
    var data = {
      paramX: 500,
      paramY: 100
    };

    db.saveData(data, function(err, result) {
      if (err) return done(err);

      // need to remember to delete this
      var id2 = result[0]._id;

      // query for all docs with paramX = 500...
      var query = {
        paramX: 500
      };

      // ...and update the matching docs so that paramY = 1000
      var update = {
        paramY: 1000
      };

      db.updateData(query, update, function(err, result) {
        if (err) return done(err);

        console.log(result);
        assert.equal(result, 2, "expected to update two documents");

        // now delete the extra doc that we just created
        db.deleteData({ _id: id2 }, done);
      });
    });

  });

  it('should delete a document', function(done) {
    db.deleteData({_id: _id}, function(err, result) {
      if (err) return done(err);
      console.log(result);
      assert.equal(result, 1, "expected to update one document");
      done();
    });
  });


})
;