var ContentView = function(content){
  this.content = content;
}

ContentView.prototype = {
  activity: function(){
    var activity = $("<li class='activity'>" + this.content.activity + "</li>")
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


  var initMap =  function() {

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: {lat: 38.9048099, lng: -77.0337394}
    });
      var customMapType = new google.maps.StyledMapType([
          {
            stylers: [
              {hue: '#16a085'},
            ]
          },
          {
            elementType: 'labels',
            stylers: [
              {hue: 'ff0022'},
              {visibility: 'simplified'},
              {gamma: 0.5},
              {weight: 0.5}
            ]
          },
          {
            featureType: 'water',
            stylers: [
              {color: '#004358'}
            ]
          }
        ],
        {
          name: 'Bucket List!'
      });
        var customMapTypeId = 'custom_style';

        var myLatLng = {lat: 38.9048099, lng: -77.0337394};

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: myLatLng,
          mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
            }
        });

        map.mapTypes.set(customMapTypeId, customMapType);
        map.setMapTypeId(customMapTypeId);

    var geocoder = new google.maps.Geocoder();

    document.getElementById('submit').addEventListener('click', function() {
      geocodeAddress(geocoder, map);
    });


  var geocodeAddress = function (geocoder, resultsMap) {
    var contents = Content.fetch();
    contents.then(function(contents){
    var contentsPlace = contents[1].location

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
