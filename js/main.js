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

        scanner.scan( function (result) {

                $.ajax({
                type: 'GET',
                url: "http://apptest.chrisstclair.co.uk/Services/RetrieveProduct.svc/GetProductInformation?productID=1",
                contentType: 'application/json; charset=UTF-8',
                dataType: 'json',
                async: true,
                success: function(msg)
                {
                    $('#palletNumberHdn').val(msg.PalletNumber);
app.navigate(
    '#palletInformationVw',
    'slide:right' //or whichever transition you like
);
                },
                error: function (msg,msg2,msg3) 
{
alert(msg.responseText);

                }
            });


          
            /*
            if (args.format == "QR_CODE") {
                window.plugins.childBrowser.showWebPage(args.text, { showLocationBar: false });
            }
            */

        }, function (error) { 
             
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

function onOnline()
{
}

function onOffline()
{
}

var palletDataSource = new kendo.data.DataSource({
    schema: { model: { palletNumber: "palletNumber" } },
transport: {
    read: {
        url: '10.1.2.8:800/StockTakeService.svc/GetPalletDetails',
        dataType: 'json',
        type:'GET'
    },
     parameterMap: function (data, type) {
        if (type == "read") {
            return 'palletNumber=' + $("#palletNumberHdn").val();
        }
    }
  }
});

var palletModel = kendo.observable({
     items: palletDataSource,
     displayName: 'Pallet Information',
     onAppChange: function(t){
     $("#Activities").data("kendoGrid").dataSource.read();
     },
});

var scanPalletVw = new kendo.View("scanPalletVw", { });
var activityView = new kendo.View("palletInformationVw", { model: palletModel });