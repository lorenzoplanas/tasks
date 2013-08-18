define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  var TaskView = Backbone.View.extend({
    tagName: 'li',
    className: 'task',
    events: {
      "dragstart"     : "on_dragstart",
      "dragover"      : "on_dragover",
      "drop"          : "on_drop",
      "click .delete" : "delete"
    },

    initialize: function() {
      this.id = 'id-' + this.model.get('id');
      this.$el.prop('draggable', true);
    },

    render: function() {
      this.$el.html(this.model.get('name') + this.delete_link());
      return this;
    },

    delete_link: function() {
      return('<a href="#" class="delete">x</a>');
    },
    
    on_dragstart: function(event) {
      var id      = this.model.get('id');
      var list_id = this.model.get('list_id');
      var payload = [id, list_id].join(':');
      event.originalEvent.dataTransfer.setData("text/plain", payload);
    },

    on_dragover: function(event) {
      event.preventDefault();
    },

    on_drop: function(event) {
      event.preventDefault();
    },

    delete: function(event) {
      this.model.destroy();
    },

    close: function() {
      this.off();
      this.remove();
    }
  });

  return TaskView;
});

