$(document).ready(function(){

  List.fetch().then(function(lists){
    lists.forEach(function(list){
      var view = new ListView(list)
      view.render();
    })
  })

  Content.fetch()

  new newListView();

});


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
