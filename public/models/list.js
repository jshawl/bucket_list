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
}

List.prototype.fetchContents = function() {
  var url = "http://localhost:3000/lists/" + this.id + "/contents"
  var request = $.getJSON(url)
  .then(function(response){
    var contents = []
    for(var i = 0; i < response.length; i++){
      contents.push(new Content(response[i]))
    }
    return contents
  })
  .fail(function(response){
    console.log("list prototype fetchContents failed to load")
  })
  return request
}
