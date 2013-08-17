define([
  'jquery',
  'underscore',
  'backbone',
  './list_view'
], function($, _, Backbone, ListView) {
  var ListsView = Backbone.View.extend({
    el: "#lists",
    render: function() {
      for (k = 0; k < this.collection.length; k++) {
        var list_view = new ListView({ model: this.collection.at(k) });
        this.$el.append(list_view.render().$el);
      }

      return this;
    }
  });

  return ListsView;
});

