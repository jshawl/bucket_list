var ListView = function(list){
  this.list = list;

  this.$el = $("<div class='list'></div>");
  this.render();

  $(".lists").append(this.$el);
};

ListView.prototype = {
  render: function(){
    var self = this;

    self.$el.html(self.listTemplate(self.list));

    var showButton  = self.$el.find(".showContents");
    var giphyButton  = self.$el.find(".showGiphy");
    var editButton  = self.$el.find(".editList");
    var deleteButton = self.$el.find(".deleteList");
    var contentsDiv = self.$el.find("div.contents");
    var giphyDiv = self.$el.find("div.giphy");

    contentsDiv.hide(); // hide div until it's populated with contents
    giphyDiv.hide();

    showButton.on("click", function(){
      self.toggleContents(contentsDiv);
    });
    giphyButton.on("click", function(){
      self.toggleGiphy(giphyDiv)
    });

    editButton.on("click", function() {
      self.renderEditForm();
    });
  },

  renderEditForm: function() {
    var self = this;
    self.$el.html(this.listEditTemplate(this.list));

    self.$el.find(".updateList").on("click", function() {
      self.updateList();
    });

    self.$el.find(".deleteList").on("click", function(){
      self.list.delete().then(function(){
        location.reload()
      });
    });
  },

  toggleButton: function(contentsDiv){
    if(contentsDiv.is(":visible")){
      contentsDiv.siblings("button.showContents").text("Hide Contents");
    } else {
      contentsDiv.siblings("button.showContents").text("Show Contents");
    }
  },
  giphyButton: function(giphyDiv){
    if(giphyDiv.is(":visible")){
      giphyDiv.siblings("button.showGiphy").text("Hide Giphy");
    } else {
      giphyDiv.siblings("button.showGiphy").text("Show Giphy");
    }
  },

  toggleContents: function(contentsDiv){
    var self = this;
    // if not in DOM, populate
    if(contentsDiv.children().length === 0){
      this.list.fetchContents().then(function(contents){
        self.appendContents(contents, contentsDiv);
      });
    }
    // toggle (note: contentsDiv starts hidden)
    contentsDiv.toggle();
    this.toggleButton(contentsDiv);
  },
  toggleGiphy: function(giphyDiv){
    var self = this;
    // if not in DOM, populate
    if(giphyDiv.children().length === 0){
      this.list.fetchContents().then(function(giphy){
        self.appendGiphy(giphy, giphyDiv);
      });
    }
    // toggle (note: contentsDiv starts hidden)
    giphyDiv.toggle();
    this.giphyButton(giphyDiv);
  },

  appendContents: function(contents, contentsDiv){
    var self = this;
    contentsDiv.append("<button id='editContent'>Edit Content</button>");
    contentsDiv.append("<button id='addContent'>Add Content</button>");
    contents.forEach(function(content){
      var contentView = new ContentView(content);
      contentsDiv.append(contentView.activity());
      contentsDiv.append(contentView.location());
      contentsDiv.append(contentView.goal_date());
});
    $("#editContent").on("click", function() {
      var contents = $(this).closest(".contents")
      var form = $("<form>Edit Contents</form>")
      var submit = $("<button>Edit Content</button>")
      var activity = $("<input placeholder='activity'>")
      var location = $("<input placeholder='location'>")
      var goal_date = $("<input placeholder='goal_date'>")
      form.append(activity)
      form.append(location)
      form.append(goal_date)
      form.append(submit)
      contents.append(form)
      submit.on("click", function(event){
        event.preventDefault();
        console.log("cool button bro")
        var data = new Content({
          activity: activity.val(),
          location: location.val(),
          goal_date: goal_date.val()
        })
        var view = new ContentView(data)
        $(".activity").html(view.activity())
        $(".location").html(view.location());
        $(".goal_date").html(view.goal_date());
        form.remove()
      }.bind(this))
      console.log("edit content button")
    });
    $("#addContent").on("click", function() {
      var contents = $(this).closest(".contents")
      var form = $("<form>Add Contents</form>")
      var submit = $("<button>Create Content</button>")
      var activity = $("<input placeholder='activity'>")
      var location = $("<input placeholder='location'>")
      var goal_date = $("<input placeholder='goal_date'>")
      form.append(activity)
      form.append(location)
      form.append(goal_date)
      form.append(submit)
      contents.append(form)
      submit.on("click", function(event){
        event.preventDefault();
        console.log("cool button bro")
        var data = new Content({
          activity: activity.val(),
          location: location.val(),
          goal_date: goal_date.val()
        })
        var view = new ContentView(data)
        contentsDiv.append(view.activity());
        contentsDiv.append(view.location());
        contentsDiv.append(view.goal_date());
        form.remove()
      }.bind(this))
      // create new form
      console.log($(this).closest(".contents"))

      console.log("add content button")
    });
  },
  appendGiphy: function(giphy, giphyDiv){
    giphy.forEach(function(giphy){
      var contentView = new ContentView(giphy);
      giphyDiv.append(contentView.giphy());
    });
  },

  updateList: function() {
    var self = this;
    var data = {  name:   $('input[name=name]').val(),
                  author: $('input[name=author]').val() };
    self.list.update(data)
    .then(function() { self.render();
    });
  },

  listTemplate: function(list){
    var html = $("<div>");
    html.append("<h3>" + list.name + "</h3>");
    html.append("<h3>" + list.author + "</h3>");
    html.append("<button class='showContents'>Show Contents</button>");
    html.append("<button class='showGiphy'>Show Giphy</button>");
    html.append("<button class='editList'>Edit List</button>");
    html.append("<div class='contents'></div>");
    html.append("<div class='giphy'></div>")
    return(html);
  },

  listEditTemplate: function(list) {
    var html = $("<div>");
    html.append("<input name='name' value='" + list.name + "'>");
    html.append("<input name='author' value='" + list.author + "'>");
    html.append("<button class='updateList'>Update List</button>");
    html.append("<button class='deleteList'>Delete List</button>");
    return(html);
  }

};
