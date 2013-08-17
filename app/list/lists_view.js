var app = app || {};

app.ListsView = Backbone.View.extend({
  el: "#lists",
  render: function() {
    for (k = 0; k < this.collection.length; k++) {
      var list_view = new app.ListView({ model: this.collection.at(k) });
      this.$el.append(list_view.render().$el);
    }

    return this;
  }
});

