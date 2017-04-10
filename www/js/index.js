/*
 (c) 2017 by G. Weirich
 Portions based on the Cordova sample (c) by Apache foundation
 */

var app = {
  // We store url and credentials in the mobile phone's localStorage.
  usernameField: "ch.webelexis.foto.username",
  passwordField: "ch.webelexis.foto.password",
  urlField: "ch.webelexis.foto.url",
  selectedPatient:{
    lastname: "Testperson",
    firstname:"Armeswesen",
    birthdate: "01.02.1960",
    id:"3f4d-4efr-1433-1234"
  },

// Initilize our app when the device is ready
  initialize: function () {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },

  // Here, the device is ready
  onDeviceReady: function () {
    this.receivedEvent('deviceready');

    // bind the camera to the "Photo aufnehmen" button. We aquire the picture as BASE64
    $('#aquire').click(function () {
      navigator.camera.getPicture(app.saveData, app.cameraFail, {destinationType: Camera.DestinationType.DATA_URL})
    })

    // When the user clicks on "Settings" prefill the input fields with data from localStorage
    $(document).on("pagebeforeshow", "#einstellungen", function () {
      var surl = localStorage.getItem(app.urlField)
      if (surl == 'null' || surl == null) {
        surl = "pa"
      }
      $('#server_url').val(surl)

      $("#server_user").val(localStorage.getItem(app.usernameField))
      $("#server_pwd").val(localStorage.getItem(app.passwordField))
    });

    // When zhe user clicks on "Übernehmen" on the settings screen, transmit values to localStorage
    $('#saveValues').click(function () {
      var surl = $("#server_url").val()
      localStorage.setItem(app.urlField, surl)
      localStorage.setItem(app.usernameField, $("#server_user").val())
      localStorage.setItem(app.passwordField, $("#server_pwd").val())
    })
  },  // end onDeviceReady

  // After camera is finished, POST the picture to the server's REST interface
  saveData: function (data) {
    var url = localStorage.getItem(app.urlField)
    var uname = localStorage.getItem(app.usernameField)
    var pwd = localStorage.getItem(app.passwordField)

    $.ajax({
      type: "POST",
      url: url,
      dataType: "json",
      async: false,
      data: {user: uname, pwd: pwd, patient: selectedPatient, payload: data},
      success: function (val) {
        alert("success")
      },
      error: function (err) {
        alert("Error: " + JSON.stringify(err))
      }
    })
  },

  // If camera fails, display reason
  cameraFail: function (err) {
    alert("Fehler bei Kamera: " + err)
  },

  // Update DOM on a Received Event
  receivedEvent: function (id) {
    var parentElement = document.getElementById(id);
    console.log('Received Event: ' + id);
  }
};


app.initialize();
