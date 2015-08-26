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
    var listdata = {  name:     self.$el.find('input[name=listName]').val(),
    author: self.$el.find('input[name=listAuthor]').val() };
    var contentdata = {  activity:     self.$el.find('input[name=contentActivity]').val(),
    location: self.$el.find('input[name=contentLocation]').val(),
    goal_date: self.$el.find('input[name=contentGoal]').val()
   };
    List.create(listdata)
    console.log(contentdata)
    List.contents.create(contentdata)
    // .then(function(newList) {
    //   self.$el.find("input").val("");  // clear the inputs
    //   self.$el.find("form").hide();  // hide the form
    //
    //   var view = new ListView(newList); // create the new list view (renders)
    // });
  }
};
