
// CTa - HW15 - Visulaizing Data With Leaflet


// Creating map object - center of map is UCI
var map = L.map("map", {
  center: [33.640495, -117.844296],
  zoom: 10
});



// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
  "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ.T6YbdDixkOBWH_k9GbS8JQ").addTo(map);



// Past 7 Days - All Earthquakes
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

function markerSize(magnitude){
    return magnitude * 10;
}

// Grabbing our GeoJSON data..
d3.json(link, function(data) {
    
    for (var i=0; i < data.features.length; i++){
        	L.geoJson(data.features[i], {
                // We turn each feature into a circleMarker on the map.
                pointToLayer: function(feature, latlng) {
                    return L.circleMarker(latlng);
                },
                // We set the style for each circleMarker using our styleInfo function.
                style: function(feature){
                    return {fillOpacity: .5,
                            color:0,
                            weight:0,
		    		        fillColor: "purple",
		    		        radius: markerSize(feature.properties.mag)};
                },
                // We create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
                onEachFeature: function(feature, layer) {
                    layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
                }
            }).addTo(map);
    }
});
        
// Marker for UCI - Data Analytics
var cone = L.marker([33.640495, -117.844296], {
 	draggable: true,
 	title: "UCI"
}).addTo(map);
 //Binding a pop-up to our marker
cone.bindPopup("Data Analytics");