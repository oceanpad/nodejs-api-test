const fs = require('fs');
const file = 'version.db';
const exists = fs.existsSync(file);

const sqlite3 = require('sqlite3').verbose();
function initializeSqliteDB() {
  var db;
  if (!db){
    return new sqlite3.Database(file);
  }
  return db;
}
const db = initializeSqliteDB();

exports.createDB = function() {
  if(!exists) {
    console.log('Creating DB file.');
    fs.openSync(file, 'w');
  }
};

exports.createTable = function() {
  db.serialize(function() {
    db.run('create table version (key text, value text, timestamp text)');
  });
};

exports.insertData = function(key, value, timestamp) {
  db.serialize(function() {
    const insertStmt = db.prepare('insert into version(key, value, timestamp) values (?, ?, ?)');
    insertStmt.run(key, value, timestamp);
    insertStmt.finalize();
  });
};

exports.selectRowsByKey = function(key, callback) {
  db.serialize(function() {
    db.all('select * from version where key = ?', key, function(err, rows) {
      if (err) {
        console.log(err);
        callback([]);
      } else {
        callback(rows);
      }
    });
  });
};

