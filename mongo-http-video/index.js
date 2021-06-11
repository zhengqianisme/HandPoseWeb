const express = require("express");
const app = express();
const fs = require("fs");
const mongodb = require('mongodb');
// const url = 'mongodb://localhost:27017';
const url = 'mongodb+srv://admin:admin@cluster0.jw6cg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

// find mongodb return src
app.get('/list', function(req, res, next) {

  mongodb.MongoClient.connect(url, function(err, client) {

  if(err) throw err;
  const db = client.db('videospath');

  let result_path = db.collection("path");

  result_path.find({}).toArray(function(err,cursor) {

      res.set({'Access-Control-Allow-Origin': '*'}).send(cursor)
      console.log(cursor)
      
  })
})
})

// insert address to mongodb
app.get('/up', function (req, res) {
  mongodb.MongoClient.connect(url, function (error, client) {
    if (error) {
      res.json(error);
      return;
    }
    // connect to the videos database
    // 插入位于服务器的video映射地址
    const db = client.db('videospath');
    var myobj =[{ name: "1", url: "http://127.0.0.1:5501/public_html/res/1.mp4" },
    { name: "2", url: "http://127.0.0.1:5501/public_html/res/2.mp4" },
    { name: "3", url: "http://127.0.0.1:5501/public_html/res/3.mp4" },
    { name: "4", url: "http://127.0.0.1:5501/public_html/res/4.mp4" },
    { name: "5", url: "http://127.0.0.1:5501/public_html/res/5.mp4" }]
    db.collection("path").insertMany(myobj, function(err, res) {
      if (err) throw err;
      console.log("文档插入成功");
      // db.close();
  });
    // All done!
    res.status(200).send("Done...");

  });
});

app.listen(8000, function () {
  console.log("Listening on port 8000!");
});
