var ContentView = function(content){
  this.content = content;
}

ContentView.prototype = {
  render: function(){
    var el = $("<p>" + this.content.activity + "</p>");
    return(el)
  }
}
