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
    // contentsDiv.append("<button id='editContent'>Edit Content</button>");
    contentsDiv.append("<button id='addContent'>Add Content</button>");
    contents.forEach(function(content){
      var contentView = new ContentView(content);
      var group = contentView.activity();
      group.append(contentView.location());
      group.append(contentView.goal_date());
      group.append(contentView.completed());
      contentsDiv.append(group)
      var id = (contentView.content.id)
      console.log(id)
      group.append("<button class='deleteContent'>Delete Content</button>");
      $(".deleteContent").on("click", function(){
        console.log("Delete Button CLICKED", id)
        Content.delete(id)
      });
})

$("ul[data-id]").on("click", function(event) {
  event.stopPropagation()
  var ul = $(event.target).closest("ul")
  var li = $(event.target).closest("li")
  var id = (ul.attr("data-id"))
  var contentVal = li.context.innerHTML
  console.log(ul)
  console.log(id)
  console.log(li)
  var contents = $(this).closest(".contents")
  var form = $("<form></form>")
  var submit = $("<button>Update Content</button>")
  // var activity = $("<input placeholder='activity'>")
  // var form = $("<form><input name='xyz' value='"+contentVal+"'></form>")
  var goal_date = $("<input placeholder='goal date'>")
  // var completed = $("<input placeholder='completed true or false'>")
  // var listId = $("<input placeholder='list ID'>")
  // form.append(values)
  // form.append(location)
  form.append(goal_date)
  // form.append(completed)
  // form.append(listId)
  form.append(submit)
  contents.append(form)
  submit.on("click", function(event){
    event.preventDefault();
    console.log("sub button click")
  //   var c = new Content({
  //     activity: activity.val(),
  //     location: location.val(),
  //     goal_date: goal_date.val()
  //   })
  //   console.log(c)
    // Content.update(newVal)
  //   var view = new ContentView(c)
  Content.update(id, {
    // location: location.val(),
    goal_date: goal_date.val()
  })

    // var newVal = ($("input[name=xyz]").val())
    // var location = $(".location")
    // location.html(newVal);
  //   $(".goal_date").html(view.goal_date());
    form.remove()
  }.bind(this))

});
    $("#addContent").on("click", function() {
      var contents = $(this).closest(".contents")
      var form = $("<form class='scoop'><p>What's the scoop?</p></form>")
      var submit = $("<button>Add to bucket</button>")
      var activity = $("<input placeholder='activity'>")
      var location = $("<input placeholder='location'>")
      var goal_date = $("<input placeholder='goal date'>")
      var completed = $("<input placeholder='completed true or false'>")
      var listId = $("<input placeholder='list ID'>")
      form.append(activity)
      form.append(location)
      form.append(goal_date)
      form.append(completed)
      form.append(listId)
      form.append(submit)
      contents.append(form)
      submit.on("click", function(event){
        event.preventDefault();
        console.log("cool button bro")
        var c = new Content({
          activity: activity.val(),
          location: location.val(),
          goal_date: goal_date.val(),
          completed: completed.val(),
          listId: listId.val()
        })
        Content.create(c)
        var view = new ContentView(c)
        contentsDiv.append(view.activity());
        contentsDiv.append(view.location());
        contentsDiv.append(view.goal_date());
        contentsDiv.append(view.completed());
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
    var data = {  author: $('input[name=author]').val(),
                  name:   $('input[name=name]').val()
                 };
    self.list.update(data)
    .then(function() { self.render();
    });
  },

  listTemplate: function(list){
    var html = $("<div>");
    html.append("<h3 class='listName'>" + list.name + ", <span class='listAuthor'>" + list.author + "</span></h3>");
    html.append("<div class='listbuttons'><button class='showContents'>Gimme the Deets</button></div>");
    html.append("<div class='listbuttons'><button class='showGiphy'>Giphy surprise!</button></div>");
    html.append("<div class='listbuttons'><button class='editList'>Edit my bucket</button></div>");
    html.append("<div class='contents'></div>");
    html.append("<div class='giphy'></div>")
    return(html);
  },

  listEditTemplate: function(list) {
    var html = $("<div>");
    html.append("<input name='author' value='" + list.author + " '>");
    html.append("<input name='name' value='" + list.name + "'>");
    html.append("<button class='updateList'>Update List</button>");
    html.append("<button class='deleteList'>Delete List</button>");
    return(html);
  }

};
