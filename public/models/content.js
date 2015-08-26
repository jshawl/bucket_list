var Content = function(info){
  this.location = info.location;
  this.activity = info.activity;
  this.goal_date = info.goal_date;
  this.completed = info.completed;
  this.listId = info.listId;
  this.id = info.id
}
Content.fetch = function() {
  var request = $.getJSON("http://localhost:3000/contents")
  .then(function(response) {
    var contents = []
    for(var i = 0; i < response.length; i++) {
      contents.push(new Content(response[i]))
    }
    return contents
  })
  .fail(function(response) {
    console.log("content fetch failed to load")
  })
  return request
};
Content.create = function(contentData) {
  var self = this;
  var url = "http://localhost:3000/contents";
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
Content.prototype = {
  fetchContents: function(){
    var url = "http://localhost:3000/lists/" + this.id + "/contents";
    var request = $.getJSON(url)
    .then(function(response){
      var contents = [];
      for(var i = 0; i < response.length; i++){
        contents.push(new Content(response[i]));
      }
      return contents;
     })
    .fail(function(repsonse){
      console.log("js failed to load");
    });
    return request;
  },
  update: function(contentData) {
    var self = this;
    var url = "http://localhost:3000/contents/" + this.id;
    var request = $.ajax({
      url: url,
      method: "put",
      data: JSON.stringify(contentData),
      contentType : 'application/json'
    }).then(
      function(updatedContentInfo) {self.reload(updatedContentInfo);}
    );
    return request;
  },
  delete: function(){
    var url = "http://localhost:3000/contents/" + this.id;
    var request = $.ajax( {url: url, method: "delete"});
    return request;
  },
  reload: function(newData){
    for(var attrname in newData) {
      this[attrname] = newData[attrname];
    }
  }
};
