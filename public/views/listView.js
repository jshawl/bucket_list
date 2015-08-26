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
