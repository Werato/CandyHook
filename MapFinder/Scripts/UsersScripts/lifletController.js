window.onload = function () {

    //var  map = L.map('map').setView([51.505, -0.09], 13);

    ////var map = L.map('map', {
    ////    center: [43.64701, -79.39425],
    ////    zoom: 15
    ////});
    //L.tileLayer('', {
    //    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    //}).addTo( map);

    var map = L.map('map');

    map.options.minZoom = 2;
    
    var gl = L.mapboxGL({
        accessToken: '{token}',
        style: '/content/mapStyle.json'
    }).addTo(map);

    map.fitWorld();

    var marker = L.marker([51.5, -0.09]).addTo( map);

    var circle = L.circle([51.508, -0.11], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(map);

    var polygon = L.polygon([
        [51.509, -0.08],
        [51.503, -0.06],
        [51.51, -0.047]
    ]).addTo( map);

    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
    circle.bindPopup("I am a circle.");
    polygon.bindPopup("I am a polygon.");

    var popup = L.popup()
        .setLatLng([51.5, -0.09])
        .setContent("I am a standalone popup.")
        .openOn(map);

    function onMapClick(e) {
        alert("You clicked the map at " + e.latlng);
    }

    map.on('click', onMapClick);

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(PositionHandler);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    function PositionHandler(coor) {
        var marker = createMarker(coor);

        marker.addTo( map);
    }

    function createMarker(coord) {
        return L.marker([position.coords.latitude, position.coords.longitude])
    }

}