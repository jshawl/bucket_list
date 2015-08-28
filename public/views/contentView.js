var ContentView = function(content){
 this.content = content;
}

ContentView.prototype = {
  activity: function(){
    var activity = $("<ul data-id='"+this.content.id+"'><li class='activity'>" + this.content.activity + "</li></ul>")
    return(activity)
  },
  location: function(){
    var location = $("<li class='location'>" + this.content.location + "</li>")
    return(location)
  },
  goal_date: function(){
    var goal_date = $("<li class='goal_date'>" + this.content.goal_date + "</li>"
    )
    return(goal_date);
  },
  completed: function(){
    var completed = $("<li class='completed'>" + this.content.completed + "</li>"
    )
    return(completed);
  },
  listId: function(){
    var listId = $("<li class='listId'>" + this.content.listId + "</li>"
    )
    return(listId);
  },
  giphy: function(){
    var search = this.content.activity; // search query
    var url = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='"+search
    $.ajax ({
          url: url,
          type: "get",
          dataType: "json"
        }).done(function(response){
          console.log(response.data.image_url)
          $("header").append("<img src=" + response.data.image_url + ">")
        }).fail(function(){
          console.log("ajax request fails!")
        }).always(function(){
          console.log("this always happens regardless of successful ajax request or not")
        })
      }
  }
  //map functionality google maps API
var initialize =  function() {
var map;
var elevator;
var myOptions = {
    zoom: 2,
    center: new google.maps.LatLng(0, 0),
    mapTypeId: 'terrain'
};
map = new google.maps.Map($('#map_canvas')[0], myOptions);

var myTitle = document.createElement('h1');
myTitle.style.color = 'white';
myTitle.innerHTML = 'Bucket Tracker';
var myTextDiv = document.createElement('div');
myTextDiv.appendChild(myTitle);

    var contents = Content.fetch();
    contents.then(function(contents){

for (var x = 0; x < contents.length; x++) {
    console.log(contents[x].location)
    $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address='+contents[x].location+'&sensor=false', null, function (data) {
        var p = data.results[0].geometry.location
        var latlng = new google.maps.LatLng(p.lat, p.lng);
        new google.maps.Marker({
            position: latlng,
            map: map
        });

    });
}
})
    var geocoder = new google.maps.Geocoder();

    document.getElementById('submit').addEventListener('click', function() {
      geocodeAddress(geocoder, map);
    });

  var geocodeAddress = function (geocoder, resultsMap) {
    var contents = Content.fetch();
    contents.then(function(contents){
      for (var j = 0; j < contents.length; j++){
        var contentsPlace = (contents[j].location);
        console.log(contents[j].location);
      }
    var address = document.getElementById('submit');
    var address = contentsPlace
    geocoder.geocode({'address': address},
    function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        resultsMap.setCenter(results[0].geometry.location);
        console.log(results)
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
    })
  }
}


//     // How to Display multiple markers on a map
//     var infoWindow = new google.maps.InfoWindow(), marker, i;
//
//     // Loop through our array of markers & place each one on the map
//     for( i = 0; i < markers.length; i++ ) {
//         var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
//         bounds.extend(position);
//         marker = new google.maps.Marker({
//             position: position,
//             map: map,
//             title: markers[i][0]
//         });
//
//         // Allow each marker to have an info window
//         google.maps.event.addListener(marker, 'click', (function(marker, i) {
//             return function() {
//                 infoWindow.setContent(infoWindowContent[i][0]);
//                 infoWindow.open(map, marker);
//             }
//         })(marker, i));
//
//         // Automatically center the map fitting all markers on the screen
//         map.fitBounds(bounds);
//     }
//
//     // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
//     var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
//         this.setZoom(14);
//         google.maps.event.removeListener(boundsListener);
//     });


//     // var map = new google.maps.Map(document.getElementById('map'), {
//     //   zoom: 12,
//     //   center: {lat: 38.9048099, lng: -77.0337394}
//     // });
//       // var customMapType = new google.maps.StyledMapType([
//       //     {
//       //       stylers: [
//       //         {hue: '#16a085'},
//       //       ]
//       //     },
//       //     {
//       //       elementType: 'labels',
//       //       stylers: [
//       //         {hue: 'ff0022'},
//       //         {visibility: 'simplified'},
//       //         {gamma: 0.5},
//       //         {weight: 0.5}
//       //       ]
//       //     },
//       //     {
//       //       featureType: 'water',
//       //       stylers: [
//       //         {color: '#004358'}
//       //       ]
//       //     }
//       //   ],
//       //   {
//       //     name: 'Bucket List!'
//       // });
//       //   var customMapTypeId = 'custom_style';
//       //
//       //   var myLatLng = {lat: 38.9048099, lng: -77.0337394};
//       //
//       //   var map = new google.maps.Map(document.getElementById('map'), {
//       //     zoom: 14,
//       //     center: myLatLng,
//       //     mapTypeControlOptions: {
//       //       mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
//       //       }
//       //   });
//       //
//       //   map.mapTypes.set(customMapTypeId, customMapType);
//       //   map.setMapTypeId(customMapTypeId);
//

// }
