<template>
<body>
	<div class="wrapper">
    <form class="form-signin">       
      <h2 class="form-signin-heading">Please login</h2>
      <input type="text" class="form-control" id="username" placeholder="Username" required="" autofocus="" />
      <input type="password" class="form-control" id="password" placeholder="Password" required=""/>      
    <button v-on:click="login_details" type="button">Login</button> 
      <br>
      <br>
      <button v-on:click="register" type="button">Register</button>  
    </form>
  </div>
  </body>
</template>
<script>
/* eslint-disable */
import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import store from '../store/index.js'
import router from "../router/index.js"

Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://localhost:3000/ChatRoom',
    options: { useConnectionNamespace: true },
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    }
}))


export default {
    name: 'login',
    // socket event handlers
    sockets: {
        connect: function () {
            console.log('socket connected')
        },
        username: (data)=>{
            store.commit('changeUsername', data)
            router.push({ name: "HelloWorld" });
        },
        disconnect: function(){
            console.log('socket disconnected')
        },

    }, 
    methods: {
        login_details(){
          var username = document.getElementById("username").value
          var password = document.getElementById("password").value
          
          this.$socket.emit('login_details', {username : username, password : password})
        },
        register(){
          router.push("register")
        }
    }
}
</script>
<style>
</style>


