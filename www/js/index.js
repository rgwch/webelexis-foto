/*
 (c) 2017 by G. Weirich
 Portions based on the Cordova sample (c) by Apache foundation
 */

var app = {
  // We store url and credentials in the mobile phone's localStorage.
  usernameField: "ch.webelexis.foto.username",
  passwordField: "ch.webelexis.foto.password",
  urlField: "ch.webelexis.foto.url",
  selectedPatient:"",

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

    $('#searchbtn').click(app.findPatient)

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

    // autocomplete search box with patient data
    $("#autocomplete").on("filterablebeforefilter", function (e, data) {
      var $ul = $(this),
          $input = $(data.input),
          value = $input.val(),
          html = "";
      $ul.html("");
      if (value && value.length > 2) {
        $ul.html("<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>");
        $ul.listview("refresh");
        var url = localStorage.getItem(app.urlField) + "/fhir/Patient?name=" + $input.val()
        $.ajax({
          url: url,
          type: "GET",
          dataType: "json",
          error: function (err) {
            alert("Ajax Error: " + JSON.stringify(err))
          }

        })
            .then(function (response) {
              $.each(response.entry, function (i, val) {
                html += "<li><button class='ui-btn patselect'>" + app.getPersonalia(val) + "</button></li>";
              });
              $ul.html(html);
              $ul.listview("refresh");
              $('.patselect').click(function(item){
                app.selectedPatient=item.currentTarget.childNodes[0].data
                alert("Selected "+app.selectedPatient)
              })
              $ul.trigger("updatelayout");
            })
      }
    });

    // When the user clicks on "Übernehmen" on the settings screen, transmit values to localStorage
    $('#saveValues').click(function () {
      var surl = $("#server_url").val()
      localStorage.setItem(app.urlField, surl)
      localStorage.setItem(app.usernameField, $("#server_user").val())
      localStorage.setItem(app.passwordField, $("#server_pwd").val())
    })
  },  // end onDeviceReady

  // After camera is finished, POST the picture to the server's REST interface
  saveData: function (data) {
    var url = localStorage.getItem(app.urlField) + "/addContent/image"
    var uname = localStorage.getItem(app.usernameField)
    var pwd = localStorage.getItem(app.passwordField)

    $.ajax({
      type: "POST",
      url: url,
      dataType: "json",
      async: false,
      data: {user: uname, pwd: pwd, patient: app.selectedPatient, payload: data},
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
  },

  getPersonalia: function(patEntry){
    var rsc=patEntry['resource']
    var lastname="unbekannt"
    var firstname="unbekannt"
    var birthdate="unbekannt"
    if(rsc){
      var names=rsc['name']
      if(names && names.length>0){
        var fam=names[0]['family']
        if(fam && fam.length>0){
          lastname=fam[0]
        }
        var first=names[0]['given']
        if(first && first.length>0){
          firstname=first[0]
        }
      }
      var bd=rsc['birthDate']
      if(bd && bd.length>9){
        birthdate=bd.substr(8,2)+"."+bd.substr(5,2)+"."+bd.substr(0,4)
      }
    }
    return lastname+" "+firstname+", "+birthdate
  }

};


app.initialize();

