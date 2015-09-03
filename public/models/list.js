var List = function(info){
  // var self = this;
  this.name = info.name;
  this.author = info.author;
  this.id = info.id
  // maybe this.contents = ??
}

List.fetch = function() {
  var request = $.getJSON("/lists")
  .then(function(response) {
    var lists = []
    for(var i = 0; i < response.length; i++) {
      lists.push(new List(response[i])) // excellent
    }
    return lists
  })
  .fail(function(response) {
    console.log("list fetch failed to load") // would be useful to share with user
  })
  return request
};

List.create = function(listData) {
  var self = this; //do you need this?
  var url = "/lists";
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
    var url = "/lists/" + this.id + "/contents";
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
    var url = "/lists/" + this.id;
    var request = $.ajax({
      url: url,
      method: "put", //or patch?
      data: JSON.stringify(listData),
      contentType : 'application/json'
    }).then(
      function(updatedListInfo) {self.reload(updatedListInfo);}
    );
    return request;
  },
  delete: function(){
    var url = "/lists/" + this.id;
    var request = $.ajax( {url: url, method: "delete"});
    return request;
  },
  reload: function(newData){
    for(var attrname in newData) { //hell yeah!!
      this[attrname] = newData[attrname];
    }
  }
};
