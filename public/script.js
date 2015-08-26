$(document).ready(function(){

  List.fetch().then(function(lists){
    lists.forEach(function(list){
      var view = new ListView(list)
      view.render();
    })
  })

  new newListView();

});

function initMap() {
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
}

google.maps.event.addListener(map, 'click', function(event) {
   placeMarker(event.latLng);
});

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
