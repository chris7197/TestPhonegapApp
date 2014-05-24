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

                $.ajax({
                type: 'GET',
                url: "http://apptest.chrisstclair.co.uk/OrderSvc.svc/GetOrderNo?orderID=" + result.text,
                contentType: 'application/json; charset=UTF-8',
                dataType: 'json',
                async: true,
                success: function(msg)
                {
					playAudio('../Resources/sounds/success.wav');
                    $('#scannedBarcodes').append('<li>' + msg.GetOrderNoResult.OrderID + '<span class="value">' + msg.GetOrderNoResult.Random +'</span></li>');
					
                },
                error: function (xhr,test1,test2) {
                    alert('failure - ' + xhr.status + ' - ' + xhr.statusText + ' - ' + xhr.responseText);
                }
            });


           console.log("Scanner result: \n" +
                "text: " + result.text + "\n" +
                "format: " + result.format + "\n" +
                "cancelled: " + result.cancelled + "\n");
            document.getElementById("info").innerHTML = result.text;
        console.log(result);
            /*
            if (args.format == "QR_CODE") {
                window.plugins.childBrowser.showWebPage(args.text, { showLocationBar: false });
            }
            */

        }, function (error) { 
            console.log("Scanning failed: ", error); 
        } );
    },

};
 var my_media = null;
function playAudio(src) {
           // Create Media object from src
           my_media = new Media(src);

           // Play audio
           my_media.play();

       }
