var ContentView = function(content){
  this.content = content;
}

ContentView.prototype = {
  render: function(){
    var el = $("<p>" + this.content.activity + "</p>");
    return(el)
  },
  giphy: function(){
    var search = this.content.location; // search query
    var url = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='"+search
    $.ajax ({
          url: url,
          type: "get",
          dataType: "json"
        }).done(function(response){
          console.log(response)
          console.log(response.data.image_url)
          $("div.giphy").append("<img src=" + response.data.image_url + ">")
        }).fail(function(){
          console.log("ajax request fails!")
        }).always(function(){
          console.log("this always happens regardless of successful ajax request or not")
        })
      }
  }
