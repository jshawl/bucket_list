var ContentView = function(content){
  this.content = content;
}

ContentView.prototype = {
  activity: function(){
    var activity = $("<ul data-id='"+this.content.id+"'><li class='activity'>Activity: " + this.content.activity + "</li></ul>")
    return(activity)
  },
  location: function(){
    var location = $("<li class='location'>Where: " + this.content.location + "</li>")
    return(location)
  },
  goal_date: function(){
    var goal_date = $("<li class='goal_date'>Date for Completion: " + this.content.goal_date + "</li>"
    )
    return(goal_date);
  },
  completed: function(){
    var completed = $("<li class='completed'>Completed Yet? " + this.content.completed + "</li>"
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

  // jQuery(function($) {
  //     // Asynchronously Load the map API
  //     var script = document.createElement('script');
  //     script.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize";
  //     document.body.appendChild(script);
  // });
  var initialize =  function() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };

    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.setTilt(45);

    // Multiple Markers
    var markers = [
        ['London Eye, London', 51.503454,-0.119562],
        ['Palace of Westminster, London', 51.499633,-0.124755]
    ];

    // Info Window Content
    var infoWindowContent = [
        ['<div class="info_content">' +
        '<h3>London Eye</h3>' +
        '<p>The London Eye</p>' +        '</div>'],
        ['<div class="info_content">' +
        '<h3>Palace of Westminster</h3>' +
        '<p>The Palace of Westminster</p>' +
        '</div>']
    ];

    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;

    // Loop through our array of markers & place each one on the map
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });

        // Allow each marker to have an info window
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(14);
        google.maps.event.removeListener(boundsListener);
    });
    // var map = new google.maps.Map(document.getElementById('map'), {
    //   zoom: 12,
    //   center: {lat: 38.9048099, lng: -77.0337394}
    // });
      // var customMapType = new google.maps.StyledMapType([
      //     {
      //       stylers: [
      //         {hue: '#16a085'},
      //       ]
      //     },
      //     {
      //       elementType: 'labels',
      //       stylers: [
      //         {hue: 'ff0022'},
      //         {visibility: 'simplified'},
      //         {gamma: 0.5},
      //         {weight: 0.5}
      //       ]
      //     },
      //     {
      //       featureType: 'water',
      //       stylers: [
      //         {color: '#004358'}
      //       ]
      //     }
      //   ],
      //   {
      //     name: 'Bucket List!'
      // });
      //   var customMapTypeId = 'custom_style';
      //
      //   var myLatLng = {lat: 38.9048099, lng: -77.0337394};
      //
      //   var map = new google.maps.Map(document.getElementById('map'), {
      //     zoom: 14,
      //     center: myLatLng,
      //     mapTypeControlOptions: {
      //       mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
      //       }
      //   });
      //
      //   map.mapTypes.set(customMapTypeId, customMapType);
      //   map.setMapTypeId(customMapTypeId);

    var geocoder = new google.maps.Geocoder();

    document.getElementById('submit').addEventListener('click', function() {
      geocodeAddress(geocoder, map);
    });


  var geocodeAddress = function (geocoder, resultsMap) {
    var contents = Content.fetch();
    contents.then(function(contents){
    var contentsPlace = contents[0].location

    var address = document.getElementById('submit');
    var address = contentsPlace
    geocoder.geocode({'address': address},
    function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        resultsMap.setCenter(results[0].geometry.location);
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


// google.maps.event.addListener(map, 'click', function(event) {
//    placeMarker(event.latLng);
// });

// function placeMarker(location) {
//     var marker = new google.maps.Marker({
//         position: location,
//         map: map
//     });
// }

// var marker = new google.maps.Marker({
//   position: myLatLng,
//   map: map,
//   title: 'Hello World!'
// });
// }
