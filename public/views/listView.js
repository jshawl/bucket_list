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
      contentsDiv.siblings("button.showContents").text("Hide the details");
    } else {
      contentsDiv.siblings("button.showContents").text("Gimme the deets!");
    }
  },
  giphyButton: function(giphyDiv){
    if(giphyDiv.is(":visible")){
      giphyDiv.siblings("button.showGiphy").text("Hide Giphy");
    } else {
      giphyDiv.siblings("button.showGiphy").text("Giphy surprise!");
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
    contents.forEach(function(content){
      var contentView = new ContentView(content);
      contentsDiv.append(contentView.render());
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
    var data = {  author: $('input[name=author]').val(),
                  name:   $('input[name=name]').val()
                 };
    self.list.update(data)
    .then(function() { self.render();
    });
  },

  listTemplate: function(list){
    var html = $("<div>");
    html.append("<h3 class='listAuthor'>" + list.author + "</h3>");
    html.append("<h3 class='listName'>" + list.name + "</h3>");
    html.append("<div class='listbuttons'><button class='showContents'>Gimme the Deets</button></div>");
    html.append("<div class='listbuttons'><button class='showGiphy'>Giphy surprise!</button></div>");
    html.append("<div class='listbuttons'><button class='editList'>Edit my bucket</button></div>");
    html.append("<div class='contents'></div>");
    html.append("<div class='giphy'></div>")
    return(html);
  },

  listEditTemplate: function(list) {
    var html = $("<div>");
    html.append("<input name='author' value='" + list.author + "'>");
    html.append("<input name='name' value='" + list.name + "'>");
    html.append("<button class='updateList'>Update List</button>");
    html.append("<button class='deleteList'>Delete List</button>");
    return(html);
  }

};
