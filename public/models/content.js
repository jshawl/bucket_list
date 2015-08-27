var Content = function(info){
  this.location = info.location;
  this.activity = info.activity;
  this.goal_date = info.goal_date;
  this.completed = info.completed;
  this.listId = info.listId;
  this.id = info.id
}
Content.fetch = function() {
  var url = "/contents";
  var request = $.getJSON(url)
  .then(function(response){

    var contents = [];
    for(var i = 0; i < response.length; i++){
      contents.push(new Content(response[i]));
    }
    console.log(contents[1].location)
    return contents;
   })
  .fail(function(repsonse){
    console.log("js failed to load");
  });
  return request;
};

Content.create = function(contentData) {
  var url = "/lists/"+this.id+"/contents";
  var request = $.ajax({
    url: url,
    method: "post",
    data: JSON.stringify(contentData),
    contentType : 'application/json'
  }).then(function(contentData) {
    return new Content(contentData);
  });
  return request;
};
