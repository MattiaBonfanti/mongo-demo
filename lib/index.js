var MongoClient = require('mongodb').MongoClient,
    util = require('util'),
    _db;

exports.connect = function(host, port, db, callback) {
  if (typeof host == 'function') {
    callback = host;
    host = undefined;
  }

  if (typeof port == 'function') {
    callback = port;
    port = undefined;
  }

  if (typeof db == 'function') {
    callback = db;
    db = undefined;
  }

  var host = host || 'localhost',
      port = port || '27017',
      db = db || 'mongodemo',
      url = util.format('mongodb://%s:%s/%s', host, port, db);


  MongoClient.connect(url, function(err, db) {
    if (err) {
      return callback(err);
    }

    _db = db;
    callback();
  });

};

exports.saveData = function(data, callback) {
  var collection = _db.collection('data');
  collection.insert(data, callback);
};

exports.findOneData = function(query, callback) {
  var collection = _db.collection('data');
  collection.findOne(query, callback);
};

exports.updateOneData = function(query, update, callback) {
  var collection = _db.collection('data'),
      // sort is weird, but it's used to order in case there is more than one match
      // the sort criteria is an array of arrays
      // http://mongodb.github.io/node-mongodb-native/api-generated/collection.html#findandmodify
      sort = [['_id', 1]],
      operation = {$set: update},
      options = {new: true};
  collection.findAndModify(query, sort, operation, options, callback);
};

exports.updateData = function(query, update, callback) {
  var collection = _db.collection('data'),
      operation = {$set: update},
      options = { multi: true };
  collection.update(query, operation, options, callback);
};

exports.deleteData = function(query, callback) {
  var collection = _db.collection('data');
  collection.remove(query, callback);
};
