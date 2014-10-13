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

exports.updateData = function(query, updated, callback) {
  var collection = _db.collection('data');
  collection.update(query, { $set: updated }, callback);
};

exports.deleteData = function(query, callback) {
  var collection = _db.collection('data');
  collection.remove(query, callback);
};
