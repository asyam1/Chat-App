<template>
    <body>
        <header>
      <h1>Chat Room</h1>
      Name: <input type="text" id="username" />
      <button id="logout" class="vertical-align" v-on:click="logout" type="button">Logout</button>
    </header>
    <section id="chatroom">
        <section id="feedback">
            <ul id="admin" style="list-style-type:none" >
                <li> Welcome to chat room, how can we help you ?</li>
            </ul>
        </section>
        <section id="chat" style="list-style-type:none">
          <ul id="chat" style="list-style-type:none" >
          </ul>
        </section>
    </section>
    <section id="input_zone"> 
      <input id="message" class="vertical-align" type="text" />
      <button id="send_message" class="vertical-align" v-on:click="send_message" type="button">Send</button>
    </section>
    </body>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import store from '../store/index.js'
import router from "../router/index.js"

export default {
    name: 'HelloWorld',
    sockets: {  // socket event handlers 
        username: (data)=>{          
            store.commit('changeUsername', data)
            this.socket()
            this.send_message()
        },
        disconnect: function(){
            console.log('socket disconnected')
        },
        display_message: function(message){ // recieves the message enterd from the server 
            var currentDate = new Date();

            var date = currentDate.getDate();
            var month = currentDate.getMonth(); 
            var year = currentDate.getFullYear();
            var hour = currentDate.getHours();
            var min = currentDate.getMinutes();
            document.getElementById("username").value = store.state.username;
            var dateString = year + "-" +(month + 1) + "-" + date + ", " + hour + ":" + min; // timestamp

            var node = document.createElement("LI");
            var textnode = document.createTextNode(store.state.username + "( "+ dateString+ " )" + " : " + message);
            var btn = document.createElement("BUTTON");
            btn.innerHTML = "Like";
            node.appendChild(textnode);
            node.appendChild(btn);

            document.getElementById("chat").appendChild(node);
        
        }
    },
    methods: {
        socket() {
            
            //buttons and inputs
            var message = document.getElementById("message").value
            var send_message = document.getElementById("send_message").value
            var chatroom = document.getElementById("chatroom").value

        },
        // sending the message to the server 
        send_message: function(){
                this.$socket.emit('new_message', {message : message.value})
            
        },
        // to logout 
        logout : function(){
            router.push("/")
        }
        
    }
}
</script>
<style>
 vertical-align {
  position: relative;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

* {
    box-sizing: border-box;
}

html {
    height: 100%;
}

body {
    margin: 0px;
    height: 100%;
}

header {
    text-align: center;
}

h1 {
    font-family: 'Comfortaa', sans-serif;
    margin: 0px;
}

section#chatroom {
    border: 5px inset rgb(8, 184, 169);
    height: 10%;
    padding: 10%;
    overflow: auto;
   
    

}
section#feedback{
    text-align: left;
    background-color: rgba(218, 204, 204, 0.801);
    
}
section#chat{
    text-align: left;
    background-color: rgba(66, 211, 126, 0.801);
    
}

section#input_zone {
    height: 10%;
    text-align: center;
    bottom: 0%;
    background-color: rgb(18, 204, 250);
    border: 5px outset rgb(3, 25, 151);
}

.vertical-align {
    position: relative;
    top: 50%;
    -webkit-transform: translateY(-10%);
    -ms-transform: translateY(-10%);
    transform: translateY(-10%);
}

input#username {
    font-family: 'Comfortaa', sans-serif;
}

input#message {
    display: inline-block;
    width: 88%;
    height: 65%;
    font-family: 'Comfortaa', sans-serif;
    font-size: 2vh;
}

button#send_message {
    display: inline-block;
    height: 70%;
    width: 10%;
}

p.message {
    margin: 0px;
    width: 100%;
    height: 40px;
    font-size: 2vh;
    font-family: 'Comfortaa', sans-serif;
    padding: 1vh;
}

.message:nth-child(even) {
    background-color: #81DAF5;
}

.message:nth-child(odd) {
    background-color: #81BEF7;
}
</style>

