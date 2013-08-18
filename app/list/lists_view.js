define([
  'jquery',
  'underscore',
  'backbone',
  './mediator',
  './list_view'
], function($, _, Backbone, ListMediator, ListView) {
  var ListsView = Backbone.View.extend({
    el: "#lists",

    initialize: function() {
      this.list_mediator = new ListMediator();
    },

    render: function() {
      for (k = 0; k < this.collection.length; k++) {
        var list_view = new ListView({ 
          model:          this.collection.at(k),
          list_mediator:  this.list_mediator
        });
        this.$el.append(list_view.render().$el);
      }

      return this;
    }
  });

  return ListsView;
});

