
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // `load`, `deviceready`, `offline`, and `online`.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
 document.addEventListener("offline", onOffline, false);
        document.addEventListener("online", onOnline);
        document.getElementById('scanPallet').addEventListener('click', this.scan, false);
    },

    // deviceready Event Handler
    //
    // The scope of `this` is the event. In order to call the `receivedEvent`
    // function, we must explicity call `app.receivedEvent(...);`
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    scan: function() {
        console.log('scanning');
        
   var scanner = cordova.require("com.phonegap.plugins.barcodescanner.BarcodeScanner");
        scanner.scan( function (msg) {
          var result = msg.text;
          palletScanned(result);
        }, function (error) { 
             
        });
    }
}


// $('#scanPallet').click(function () {
// palletScanned('0004-05655');
// });
 var my_media = null;

function palletScanned(result)
{
$('#palletNumberHdn').val(result);
appKendo.navigate("#palletInformationVw","slide");

  $.ajax({
        type: 'GET',
        url: 'http://10.1.2.8:800/StockTakeService.svc/GetPalletDetails?barcode=' + result,
        contentType: 'application/json; charset=UTF-8',
        dataType: "json",
        async: false,
        error: function (msg) {
            alert(msg + " p");
        },
        success: function (obj) {
          $('#palletNumber').html(obj.PalletNumber);
          $('#material').html(obj.Material);
          $('#colour').html(obj.Colour);
          $('#afs').html(obj.AvailableForSale);
        }
    });

}

function playAudio(src) {

           // Create Media object from src
    //       my_media = new Media(src);

           // Play audio
      //     my_media.play();

       }
function getPhoneGapPath() {

    var path = window.location.pathname;
    path = path.substr( path, path.length - 10 );
    return 'file://' + path;

};

function onOnline()
{
}

function onOffline()
{
}


var scanPalletVw = new kendo.View("scanPalletVw", { });
var activityView = new kendo.View("palletInformationVw", { });
 var appKendo = new kendo.mobile.Application();