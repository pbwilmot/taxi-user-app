var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        //document.addEventListener('DOMContentLoaded', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        initializeMap();
    },
};

function initializeMap() {
    console.log("initializeMap");
    navigator.geolocation.getCurrentPosition(onGeolocationSuccess, onGeolocationError);

    // var mapOptions = {
    //     center: new google.maps.LatLng(43.069452, -89.411373),
    //     zoom: 11,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    // };
    // var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

// onSuccess Geolocation
function onGeolocationSuccess(position) {
    var longitude = position.coords.longitude;
    var latitude = position.coords.latitude;
    var latLng = new google.maps.LatLng(latitude, longitude);

    var mapOptions = {
        center: latLng,
        zoom: 16,
        mapTyoeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map")
        , mapOptions);
    map.setCenter(latLng);
    // map.setMyLocationEnabled(true);
    var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: 'My Location',
        draggable: true
    });

    // Write the formatted address
    writeAddressName(latLng);   
};

    // onError Callback receives a PositionError object
function onGeolocationError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
};

function writeAddressName(latLng) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
          "location": latLng
        },
        function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                document.getElementById("address").innerHTML = results[0].formatted_address;
            } else {
                document.getElementById("error").innerHTML += "Unable to retrieve your address" + "<br />";
            }
        });
      }
