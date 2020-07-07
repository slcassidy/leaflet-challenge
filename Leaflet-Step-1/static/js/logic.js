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
console.log(url);

//load data -> THEN add to map
d3.json(url, (data)=>{
    var data_feed = data.features
    // console.log(data_feed)

    var circleArray = [];
    var sizeArray = [];
      // Create a new marker cluster group
    // var markers = L.markerClusterGroup();
    for (var i = 0; i < data_feed.length; i++){
        var loc = data_feed[i].geometry;
        var size = data_feed[i].properties;
        // console.log(loc)
        if(loc){
            // console.log(loc.coordinates[1])
            // console.log(loc.coordinates[0])
            // L.marker([loc.coordinates[1], loc.coordinates[0]]).addTo(myMap)
            circleArray.push([loc.coordinates[1], loc.coordinates[0]])
            sizeArray.push([size.mag]);
            L.circle([loc.coordinates[1], loc.coordinates[0]], {
                color: chooseColor(size.mag),
                fillColor: chooseColor(size.mag),
                fillOpacity: 0.75,
                radius: (size.mag * 8000),


            }).addTo(myMap)
                .bindPopup(`Earthquake Magnitude: ${size.mag} <br>` + `Place: ${size.place} <br>`
                + `Magnitude Type: ${size.magType}`);

        }

    }
    //Create pop-ups
    //Create a legend
    // console.log(sizeArray);
 //Create case statement for the colors
    function chooseColor(b){

        if (b < .25) {
            return "#FEB24C";
        } else if (b < .50) {
            return "#FD8D3C";
        } else if (b < 1) {
            return "#FC4E2A";
        } else if (b < 2) {
            return "#E31A1C";
        } else if (b <= 3) {
            return "#BD0026";
        } else {
            return "#800026";
        };

    }

});

// function isString(x) {
//     return Object.prototype.toString.call(x) === "[object String]"
//   };