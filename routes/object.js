var express = require('express');
var router = express.Router();
var Sqlite= require('../apis/Sqlite');

router.get('/', function(req, res, next) {
  Sqlite.initDB();
  res.send('object home page');
});

router.get('/:key', function(req, res, next) {
  var key = req.params.key;
  var timestamp = req.query.timestamp;
  if(typeof timestamp !== 'undefined'){
    if(isNaN(Number(timestamp))){
      res.send("Please send right formatter timestamp.");
      return;
    }
    Sqlite.selectLatestRowByKeyWithTimestamp(key, timestamp, function(rows){
      if(rows.length === 0 || rows[0].key === null) {
        res.send("No data is avilable");
        return;
      }
      res.send(rows[0]);
    });
    return;
  }
  Sqlite.selectLatestRowByKey(key, function(rows){
    if(rows.length === 0 || rows[0].key === null) {
      res.send("No data is avilable");
      return;
    }
    console.log(JSON.stringify(rows))
    res.send(rows[0]);
  })
});

router.post('/', function(req, res, next) {
  var paramKeys = Object.keys(req.body);
  if(paramKeys.length === 0){
    res.status(400)
      .send('Bad Request. Please post json data like: {key1:value1, key2:value2...}');
    return;
  }
  var now = new Date();
  var nowTime = Math.round(now.getTime()/1000);
  for(var index in paramKeys){
    var key = paramKeys[index];
    var value = req.body[key];
    updateData(key, value, nowTime.toString());
  }
  res.send("Data updated!");
});

function updateData(key, value, timestamp){
  var result = [];
  Sqlite.insertData(key, value, timestamp);
}

module.exports = router;
