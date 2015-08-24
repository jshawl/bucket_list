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
    var editButton  = self.$el.find(".editList");
    var contentsDiv = self.$el.find("div.contents");

    contentsDiv.hide(); // hide div until it's populated with contents

    showButton.on("click", function(){
      self.toggleContents(contentsDiv);
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
  },
  toggleButton: function(contentsDiv){
    if(contentsDiv.is(":visible")){
      contentsDiv.siblings("button.showContents").text("Hide Contents");
    } else {
      contentsDiv.siblings("button.showContents").text("Show Contents");
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

  appendContents: function(contents, contentsDiv){
    contents.forEach(function(content){
      var contentView = new ContentView(content);
      contentsDiv.append(contentView.render());
    });
  },
  updateList: function() {
    var self = this;
    var data = {  name:   $('input[name=name]').val(),
                  author: $('input[name=author]').val(),
    self.list.update(data).then(function() { self.render(); });
  },
  listTemplate: function(list){
    var html = $("<div>");
    html.append("<h3>" + list.name + "</h3>");
    html.append("<h3>" + list.author + "</h3>");
    html.append("<button class='showContents'>Show Contents</button>");
    html.append("<button class='editList'>Edit List</button>");
    html.append("<div class='contents'></div>");
    return(html);
  },
  listEditTemplate: function(list) {
    var html = $("<div>");
    html.append("<input name='name' value='" + list.name + "'>");
    html.append("<input name='author' value='" + list.author + "'>");
    html.append("<button class='updateList'>Update List</button>");
    return(html);
  }
