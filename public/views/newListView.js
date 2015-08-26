var newListView = function(list){
  var self = this;
      self.$el = $(".newListView");
      self.$el.find("form").hide();

  var showFormButton    = self.$el.find(".addList");
  var submitFormButton  = self.$el.find(".createList");

  showFormButton.on("click", function() {
    self.$el.find("form").slideToggle();
  });

  submitFormButton.on("click", function(event) {
    event.preventDefault();
    self.createList();
  });

};

newListView.prototype = {
  createList: function() {
    var self = this;
    var data = {  name:     self.$el.find('input[name=thing]').val(),
    author: self.$el.find('input[name=blue]').val() };
    List.create(data).then(function(newList) {
      self.$el.find("input").val("");  // clear the inputs
      self.$el.find("form").hide();  // hide the form

      var view = new ListView(newList); // create the new list view (renders)
    });
  }
};
