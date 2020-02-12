const { fork }  = require('child_process');
const express   = require('express');
const app       = express();
var mongoclient = require('mongodb').MongoClient;
var fs          = require('fs');
const PORT      = 4000;
const url       = "mongodb://localhost:27017/"

initDB();

// function for updating initial user samples in database
function initDB(){
    mongoclient.connect(url,{useNewUrlParser:true, useUnifiedTopology: true},function(err,db){
        var db1=db.db("User_db");
        db1.collection("Client_col").insertMany([
            {
                "FIRSTNAME":"AAD",
                "LASTNAME":"ADA",
                "USER":"admin",
                "PASS":"admin"
            },
            {
                "FIRSTNAME":"John",
                "LASTNAME":"Doe",
                "USER":"john",
                "PASS":"password"
            },
            {
                "FIRSTNAME":"Adam",
                "LASTNAME":"Smith",
                "USER":"adam",
                "PASS":"password"
            }
        ],function(err,res){
        if(err) throw err;
        db.close();
        });
    });
}

// forking the server to start
const forked = fork('./server.js');
forked.on('message', (msg) => {
    if(msg===null){ console.log('Sever Process quit');
    }else { console.log(msg) }
  
  });