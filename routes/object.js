var express = require('express');
var router = express.Router();
var Sqlite= require('../apis/Sqlite');

var datas = [["key", "value", 1495549866230], ["key", "value", 1495549866280]]

// get /obejct
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// get /obejct/key
router.get('/:key', function(req, res, next) {
  var key = req.params.key;
  var timestamp = req.query.timestamp;
  if(typeof timestamp !== 'undefined'){
    var record = findRecordByKeyAndTimestamp(key, timestamp)
    res.send("record with timestamp: " + JSON.stringify(record));
    return;
  }
  var record = findLatestRecordByKey(key)
  res.send("Latest Record: " + JSON.stringify(record));
});

// post /obejct data:{"key": "value'}
router.post('/', function(req, res, next) {
  var paramKeys = Object.keys(req.body);
  if(paramKeys.length === 0){
    res.status(400)
      .send('Bad Request. Please post json data like: {key1:value1, key2:value2...}');
    return;
  }
  var now = new Date();
  var nowTime = now.getTime();
  for(var index in paramKeys){
    var key = paramKeys[index];
    var value = req.body[key];
    var result = updateData(key, value, nowTime);
    console.log(result);
  }
  res.send("Data updated: " + JSON.stringify(req.body));
});

function updateData(key, value, timestamp){
  Sqlite.selectRowsByKey("version", function(rows){
    console.log(JSON.stringify(rows));
  });
  Sqlite.insertData(key, value, timestamp);
}

function findLatestRecordByKey(key){
  return {"key": "value"}
}

function findRecordByKeyAndTimestamp(key, timestamp){
  return {"key": "value"}
}

module.exports = router;
