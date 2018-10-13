var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://mongo:27017/db";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) {
        throw err;
    }
    console.log("Database created!");
    db.close();
});