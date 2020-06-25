// Creating map object
var myMap = L.map("map", {
    center: [37.8, -96],
    zoom: 5
  });
  
// Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Store API query variables
// // Store our API endpoint inside queryUrl
var baseUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&";
var date = "starttime=2014-01-01&endtime=2014-01-02&"
var range = "maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

var url = baseUrl + date + range;

//load data -> THEN add to map
d3.json(url, (data)=>{
    var data_feed = data.features
    // console.log(data_feed)

    var circleArray = [];
    for (var i = 0; i < data_feed.length; i++){
        var loc = data_feed[i].geometry;
        // console.log(loc)
        if(loc){
            // console.log(loc.coordinates[1])
            // console.log(loc.coordinates[0])
            // L.marker([loc.coordinates[1], loc.coordinates[0]]).addTo(myMap)
            // circleArray.push([loc.coordinates[1], loc.coordinates[0]])
            L.circle([loc.coordinates[1], loc.coordinates[0]], {
                // color: 'red',
                // fillColor: '#f03',
                // fillOpacity: 0.5,
                color: "green",
                fillColor: "green",
                fillOpacity: 0.75,
                radius: 10000
                // radius: 200
            }).addTo(myMap)
        }
    }

    // var circle = L.circle(circleArray, {
    // var circle = 
    // L.circle([33.7490, 84.3880], {
    //     // color: 'red',
    //     // fillColor: '#f03',
    //     // fillOpacity: 0.5,
    //     color: "green",
    //     fillColor: "green",
    //     fillOpacity: 0.75,
    //     radius: 500
    //     // radius: 200
    // }).addTo(myMap)

    // var heat = L.heatLayer(circleArray,{
    //     radius:60,
    //     blur: 35
    // }).addTo(map)

});