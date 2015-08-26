var ContentView = function(content){
  this.content = content;
}

ContentView.prototype = {
  render: function(){
    var el = $("<p>" + this.content.activity + "</p>");
    return(el)
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

  // var initMap =  function() {
  //   var map = new google.maps.Map(document.getElementById('map'), {
  //     zoom: 12,
  //     center: {lat: 38.9048099, lng: -77.0337394}
  //   });


    var geocoder = new google.maps.Geocoder();

    document.getElementById('submit').addEventListener('click', function() {
      geocodeAddress(geocoder, map);
    });
  }

  var geocodeAddress = function (geocoder, resultsMap) {

    var address = document.getElementById('address').value;
    var address = "Austin, TX"
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
  }
