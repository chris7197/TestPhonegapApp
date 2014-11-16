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
        document.getElementById('scan').addEventListener('click', this.scan, false);
    },

    // deviceready Event Handler
    //
    // The scope of `this` is the event. In order to call the `receivedEvent`
    // function, we must explicity call `app.receivedEvent(...);`
    onDeviceReady: function() {
         $("#company").kendoDropDownList();
         $( "#saveButton" ).click(function() {
            saveOrder();
});
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
                    $('#productList').append('<li data-id="' + msg.d.ID + '">' + msg.d.Name + '</li>');					
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
alert('Online');
}

function onOffline()
{
alert('Offline');
}

function saveOrder()
{
      var magicNo = $('#magicNo').val();
    var requiredDate = $("#requiredDate").val();
    var company = $("#company").data("kendoDropDownList").value();
    var products = [];
    var i =0;
    $("#productList li").each(function() {
        products[i] = $(this).data("id");
        i++;
    });

     var str = JSON.stringify({ magicNo: magicNo, companyID: company, requiredDate: requiredDate, productIDs: products });
    $.ajax({
        type: 'POST',
        url: "http://apptest.chrisstclair.co.uk/Services/OrderCreation.svc/CreateHeader",
        contentType: 'application/json; charset=UTF-8',
        dataType: 'json',
        data: str,
        async: true,
        success: function (msg) {
            $('#magicNo').val('');
            $('#requiredDate').val('');
                        $('#company').data("kendoDropDownList").value('');
            $('#productList').empty();
            alert('Saved!');
        },
        error: function (msg) {
            alert(msg.responseText);
        }
    });
}
