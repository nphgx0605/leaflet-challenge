// Create a map object
let myMap = L.map("map", {
    center: [38.9637, 35.2433],
    zoom: 5
});

// Adding a tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(myMap);

//Fetch the data using d3
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson").then(function(data) {
    console.log(data);
 // Process the data here (e.g., plotting the points on the map)
 var earthquakes = data.features;

 earthquakes.forEach(function(earthquake) {
     var coords = earthquake.geometry.coordinates;
     var magnitude = earthquake.properties.mag;
     var depth = coords[2]; // The third element is depth
     var place = earthquake.properties.place;

     // Use Leaflet to plot each earthquake on the map
     L.circleMarker([coords[1], coords[0]], {
         radius: magnitude * 4,
         fillColor: getColor(depth),
         fillOpacity: 0.75,
         color: "#000",
         weight: 1
     }).bindPopup(`<h3>${place}</h3><hr><p>Magnitude: ${magnitude}</p><p>Depth: ${depth} km</p>`).addTo(myMap);
 });
});

function getColor(depth) {
    return depth > 90 ? "#ff3333" :
           depth > 70 ? "#ff6633" :
           depth > 50 ? "#ff9933" :
           "#ffcc33";
  }
  
  marker.bindPopup(`<h3>Location: ${place}</h3><hr><p>Magnitude: ${magnitude}</p><p>Depth: ${depth}</p>`);


