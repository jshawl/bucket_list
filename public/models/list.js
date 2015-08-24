var List = function(info){
  // var self = this;
  this.name = info.name;
  this.author = info.author;
  this.id = info.id
}

List.fetch = function() {
  var request = $.getJSON("http://localhost:3000/lists")
  .then(function(response) {
    var lists = []
    for(var i = 0; i < response.length; i++) {
      lists.push(new List(response[i]))
    }
    return lists
  })
  .fail(function(response) {
    console.log("list fetch failed to load")
  })
  return request
};

List.create = function(listData) {
  var self = this;

  var url = "http://localhost:3000/lists";
  var request = $.ajax({
    url: url,
    method: "post",
    data: JSON.stringify(listData),
    contentType : 'application/json'
  }).then(function(listData) {
    return new List(listData);
  });
  return request;
};

List.prototype = {
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
  update: function(listData) {
    var self = this;
    var url = "http://localhost:3000/lists/" + this.id;
    var request = $.ajax({
      url: url,
      method: "put",
      data: JSON.stringify(listData),
      contentType : 'application/json'
    }).then(
      function(updatedListInfo) {self.reload(updatedListInfo);}
    );
    return request;
  },
  delete: function(){
    var url = "http://localhost:3000/lists/" + this.id;
    var request = $.ajax( {url: url, method: "delete"});
    return request;
  },
  reload: function(newData){
    for(var attrname in newData) {
      this[attrname] = newData[attrname];
    }
  }
};
