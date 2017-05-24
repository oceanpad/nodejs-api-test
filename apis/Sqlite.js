var fs = require('fs');
var file = 'version.db';
var exists = fs.existsSync(file);

var sqlite3 = require('sqlite3').verbose();
function initializeSqliteDB() {
  var db;
  if (!db){
    return new sqlite3.Database(file);
  }
  return db;
}
var db = initializeSqliteDB();

function createDbFile() {
  if(!exists) {
    console.log('Creating DB file.');
    fs.openSync(file, 'w');
  }
};

function initTable() {
  db.serialize(function() {
    db.all("select name from sqlite_master where type='table'", function (err, tables) {
      var version = tables.find(function(t){return t.name == 'version'})
      if(typeof version === 'undefined'){
        createVersionTable();
        console.log('db initialized!');
      }
    });
  });
};

function createVersionTable() {
  db.serialize(function() {
    db.run(`create table version (key text, value text, timestamp text,
      created_at datetime default current_timestamp)`, function(err){
      if (err) {
        console.log(err);
      }
    });
  });
};

exports.initDB = function() {
  createDbFile();
  initTable();
};

exports.insertData = function(key, value, timestamp) {
  db.serialize(function() {
    var insertStmt = db.prepare('insert into version(key, value, timestamp) values (?, ?, ?)');
    insertStmt.run(key, value, timestamp, function(err){
      if (err) {
        console.log(err);
      }
    });
    insertStmt.finalize();
  });
};

exports.selectLatestRowByKey = function(key, callback) {
  db.serialize(function() {
    db.all('select key, value, max(timestamp) as timestamp from version where key = ?', key,
    function(err, rows) {
      if (err) {
        console.log(err);
        callback([]);
      } else {
        callback(rows);
      }
    });
  });
};

exports.selectLatestRowByKeyWithTimestamp = function(key, timestamp, callback) {
  db.serialize(function() {
    db.all(`select key, value, max(timestamp) as timestamp from version
      where key = ? and timestamp < ?`, key, timestamp, function(err, rows) {
      if (err) {
        console.log(err);
        callback([]);
      } else {
        callback(rows);
      }
    });
  });
};

