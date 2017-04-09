/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {

  // Application Constructor
  initialize: function () {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function () {
    this.receivedEvent('deviceready');
    $('#aquire').click(function(){
      alert("clicked")
      navigator.camera.getPicture(function(succ){
        alert(succ)
      },function(err){
        alert(err)
      })
    })
    $(document).on("pagebeforeshow","#einstellungen",function(){
      var surl=localStorage.getItem("ch.webelexis.foto.url")
      if(surl=='null' || surl==null){
        surl="pa"
      }
      $('#server_url').val(surl)
      $("#server_user").val(localStorage.getItem("ch.webelexis.foto.username"))
      $("#server_pwd").val(localStorage.getItem("ch.webelexis.foto.password"))
    });
    $('#saveValues').click(function(){
      var surl=$("#server_url").val()
      localStorage.setItem("ch.webelexis.foto.url",surl)
      localStorage.setItem("ch.webelexis.foto.username",$("#server_user").val())
      localStorage.setItem("ch.webelexis.foto.password",$("#server_pwd").val())
    })
  },

  save: function(data){
    alert(data)
  },
  // Update DOM on a Received Event
  receivedEvent: function (id) {
    var parentElement = document.getElementById(id);
    console.log('Received Event: ' + id);
  },
};


app.initialize();