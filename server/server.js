//
//      This file contains the server which listens to the socket using socket.io. Created a custom namespace to enable all used to connect to same namespace, login feature
//      is enabled, which checks the database for the username and password. New user's password is encrypted using cryptr module. 
//
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const express   = require('express');
const app       = express();
const server    = require('http').Server(app);
const io        = require('socket.io')(server);
var mongoclient = require('mongodb').MongoClient;
const url       = "mongodb://localhost:27017/"
const PORT      = 3000;	
const Cryptr    = require('cryptr');


var nsp = io.of('ChatRoom'); // custom namespace for socket.io
const cryptr = new Cryptr('myTotalySecretKey'); //key for encryption

// socket.io connections
nsp.on('connection', function(socket){
    console.log('client connected')

    socket.on('disconnect',function(){
        socket.disconnect(socket.id)
        console.log('client disconnected')

    })
    socket.on('login_details', (data) => {
        checkDB(data.username, data.password, socket) // checking if the username and password is authorized

        //listen on new_message
        socket.on('new_message', (data) => {
            //broadcast the new message
            socket.emit('display_message', data.message);
        }) 
    }) 
    socket.on("register_details", (data)=>{
        updateDB(data, socket)
    })   
})

server.listen(PORT, function(){ 
    process.send("connection working")
    console.log('Server is running on Port:',PORT); 
});

process.on("uncaughtException", function(err){
console.log(err)
process.send("error")
})

function SendToClient (dest, data){ io.emit(dest, data); }

// function to check the database 
function checkDB(username, password, socket){
    mongoclient.connect(url,{useNewUrlParser:true, useUnifiedTopology: true},function(err,db){
        var db1=db.db("User_db");
        
        db1.collection("Client_col").findOne({ "USER":username},
        function(err,res){
            if(err) throw console.log(err);
            if(res.USER == "admin" || res.USER == "john" || res.USER == "smith"){
                if(res.USER == username && res.PASS == password){
                    socket.emit("username", res.FIRSTNAME)
                }
             }
             else{
                if(res.USER == username ){
                    const decryptedString = cryptr.decrypt(res.PASS)
                    if(password == decryptedString.toString())
                        socket.emit("username", res.FIRSTNAME)
                }
            }
        db.close();
        });
    });
}

// function to update the database
function updateDB(data, socket){
    mongoclient.connect(url,{useNewUrlParser:true, useUnifiedTopology: true},function(err,db){
        var db1=db.db("User_db");
        const encryptedString = cryptr.encrypt(data.password);
        db1.collection("Client_col").insertOne({ "FIRSTNAME": data.fname, "LASTNAME": data.lname, "USER" : data.username , "PASS" : encryptedString},
        function(err,res){
            if(err) throw console.log(err);
            socket.emit("registered", data.usernamerz)
            db.close();
        });
    });
}