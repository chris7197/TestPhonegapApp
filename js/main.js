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
        document.getElementById('scan').addEventListener('click', this.scan, false);
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

        scanner.scan( function (result) { 
$('#scannedBarcodes').append('<li style="color: red;">Loading for ' + result + '...</li>');
                $.ajax({
                type: 'GET',
                url: "http://apptest.chrisstclair.co.uk/OrderSvc.svc/GetOrderNo?orderID=" + result,
                contentType: 'application/json; charset=UTF-8',
                dataType: 'json',
                async: true,
                success: function(msg)
                {
                    $('#scannedBarcodes li:last').remove();
                    var pgPath = getPhoneGapPath();

					playAudio(pgPath + 'Resources/sounds/success.wav');
                    $('#scannedBarcodes').append('<li>' + msg.GetOrderNoResult.OrderID + '<span class="value">' + msg.GetOrderNoResult.Random +'</span></li>');
					
                },
                error: function (msg) {
                    $('#scannedBarcodes li:last').remove();
                    $('#scannedBarcodes').append('<li>ERROR:' + msg.statusText + '</li>');
				
                }
            });


          
            /*
            if (args.format == "QR_CODE") {
                window.plugins.childBrowser.showWebPage(args.text, { showLocationBar: false });
            }
            */

        }, function (error) { 
              $('#scannedBarcodes').append('<li>ERROR:' + msg.statusText + '</li>');
        });
    }
}


 var my_media = null;
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

