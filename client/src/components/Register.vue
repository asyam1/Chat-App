<template>
<body>
	<div class="wrapper">
    <form class="form-signup">       
        <h2 class="form-signup-heading">Please register</h2>
            First Name : <input type="text" class="form-control" id="fname" placeholder="First Name" required autofocus="" /> <br>
            Last Name  : <input type="text" class="form-control" id="lname" placeholder="Last Name" required/> <br>
            Username   : <input type="text" class="form-control" id="username" placeholder="Username" required/><br>
            Password   : <input type="password" class="form-control" id="password" placeholder="Password" required/>  <br> <br>   
        <button v-on:click="register_details" type="button">Register</button> 
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


export default {
    name: 'register',
    // socket event handlers
    sockets: {
        username: (data)=>{
            store.commit('changeUsername', data)
            router.push({ name: "/" });
        },
        disconnect: function(){
            console.log('socket disconnected')
        },
        registered: function(){
            router.push("/")
        }

    }, 
    methods: {
        register_details(){
            var fname = document.getElementById("fname").value
            var lname = document.getElementById("lname").value
            var username = document.getElementById("username").value
            var password = document.getElementById("password").value
            
            this.$socket.emit('register_details', {username : username, password : password, fname : fname, lname : lname})
        }
    }
}
</script>
<style>
</style>


