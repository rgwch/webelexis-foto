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
  usernameField: "ch.webelexis.foto.username",
  passwordField: "ch.webelexis.foto.password",
  urlField:"ch.webelexis.foto.url",

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
    $('#aquire').click(function () {
      navigator.camera.getPicture(app.saveData, function (err) {
        alert(err)
      })
    })
    $(document).on("pagebeforeshow", "#einstellungen", function () {
      alert(app.urlField)
      var surl = localStorage.getItem(app.urlField)
      alert(surl)
      if (surl == 'null' || surl == null) {
        surl = "pa"
      }
      $('#server_url').val(surl)

      $("#server_user").val(localStorage.getItem(app.usernameField))
      $("#server_pwd").val(localStorage.getItem(app.passwordField))
    });
    $('#saveValues').click(function () {
      var surl = $("#server_url").val()
      localStorage.setItem(app.urlField, surl)
      localStorage.setItem(app.usernameField, $("#server_user").val())
      localStorage.setItem(app.passwordField, $("#server_pwd").val())
    })
  },

  saveData: function (data) {
    var url = localStorage.getItem(app.urlField)
    var uname=localStorage.getItem(app.usernameField)
    var pwd=localStorage.getItem(app.passwordField)
    $.post(url,{user:uname,pwd:pwd,payload:data},function(result,statusText,xp){
      alert(statusText)
      if(result['status']!= 'ok'){
        alert("Fehler bei der Verbindung")
      }
    },"application/json")
  },
  // Update DOM on a Received Event
  receivedEvent: function (id) {
    var parentElement = document.getElementById(id);
    console.log('Received Event: ' + id);
  },
};


app.initialize();