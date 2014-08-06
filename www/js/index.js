var SERVER_ROOT = 'http://rocky-spire-6395.herokuapp.com/taxiservice';

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
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log('initializeMap');
        navigator.geolocation.getCurrentPosition(onGeolocationSuccess, onGeolocationError);
    },
};

// onSuccess Geolocation
function onGeolocationSuccess(position) {
    var longitude = position.coords.longitude;
    var latitude = position.coords.latitude;
    var latLng = new google.maps.LatLng(latitude, longitude);

    var mapOptions = {
        center: latLng,
        zoom: 14,
        mapTyoeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById('map')
        , mapOptions);

    // Add marker for user's position
    new google.maps.Marker({
        position: latLng,
        map: map,
        title: 'My Location',
        draggable: true
    });

    // Write the formatted address
    writeAddressName(latLng);


    // Get nearby drivers
    $.getJSON(SERVER_ROOT+'?loc=' + longitude + '&loc=' + latitude + '&callback=?', function(data) {
        console.log(data.length + ' nearby drivers found');
        for( var i = 0; i < data.length; i++) {
            console.log('Taxi found @' + data[i].loc[1] +', ' + data[i].loc[0]);
            var taxiLatLng = new google.maps.LatLng(data[i].loc[1], data[i].loc[0]);
            drawTaxi(map, taxiLatLng);
        }
    });
};

function drawTaxi(map, taxiLatLng) {
    new google.maps.Marker({
        position: taxiLatLng,
        map: map,
        title: 'Taxi Location',
        draggable: false
    });
}

// onError Callback receives a PositionError object
function onGeolocationError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
};

function writeAddressName(latLng) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        'location': latLng
    },
    function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            document.getElementById('address').innerHTML = results[0].formatted_address;
        } else {
            document.getElementById('address').innerHTML += 'Unable to retrieve your address' + '<br />';
        }
    });
}
