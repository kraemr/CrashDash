// See post: http://asmaloney.com/2015/06/code/clustering-markers-on-leaflet-maps

var map = L.map('map', {
  center: [51.5, 9.5],
  minZoom: 6,
  zoom: 6,
})

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: ['a', 'b', 'c'],
}).addTo(map)

var myURL = jQuery('script[src$="leaf-demo.js"]')
  .attr('src')
  .replace('leaf-demo.js', '')

var myIcon = L.icon({
  iconUrl: myURL + 'images/pin48.png',
  iconRetinaUrl: myURL + 'images/pin48.png',
  iconSize: [32, 32],
  iconAnchor: [9, 21],
  popupAnchor: [100, 0],
})

var markerClusters = L.markerClusterGroup()

for (var i = 0; i < markers.length; ++i) {
  var popup =
    markers[i].name +
    '<br/>' +
    markers[i].city +
    '<br/><b>IATA/FAA:</b> ' +
    markers[i].iata_faa +
    '<br/><b>ICAO:</b> ' +
    markers[i].icao +
    '<br/><b>Altitude:</b> ' +
    Math.round(markers[i].alt * 0.3048) +
    ' m' +
    '<br/><b>Timezone:<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a></b> ' +
    markers[i].tz

  var m = L.marker([markers[i].lat, markers[i].lng], {
    icon: myIcon,
  }).bindPopup(popup)

  markerClusters.addLayer(m)
}

map.addLayer(markerClusters)



var button = document.getElementById('test');

// Dann fügen Sie einen 'click' Event Listener hinzu
button.addEventListener('click', function() {
  // Find the city using Nominatim
var cityName = 'Berlin';
var url = 'https://nominatim.openstreetmap.org/search?q=' + cityName + '&format=json&limit=1';
fetch(url)
  .then(response => response.json())
  .then(data => {
    var cityId = data[0].osm_id;

    // Get the city boundary using Nominatim details API
    var detailsUrl = 'https://nominatim.openstreetmap.org/details';
    var params = {
      osmtype: 'R',
      osmid: cityId,
      format: 'json',
      addressdetails: 1,
      polygon_geojson: 1,
    };
    var detailsUrlWithParams = detailsUrl + '?' + new URLSearchParams(params);
    fetch(detailsUrlWithParams)
      .then(response => response.json())
      .then(data => {
        var cityBoundary = data.geojson;

        // Create a polygon layer for the city boundary
        var boundaryLayer = L.geoJSON(cityBoundary, {
          style: {
            color: 'red',
            weight: 2,
            fillOpacity: 0.1,
          },
        }).addTo(map);

        // Fit the map to the city boundary
        map.fitBounds(boundaryLayer.getBounds());
      });
  });
});