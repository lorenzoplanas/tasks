var app = app || {};

app.TaskView = Backbone.View.extend({
  tagName: 'li',
  className: 'task',
  events: {
    "dragstart" : "on_dragstart",
    "dragover"  : "on_dragover",
    "drop"      : "on_drop"
  },

  initialize: function() {
    this.id = 'id-' + this.model.get('id');
    this.$el.prop('draggable', true);
  },

  render: function() {
    this.$el.html(this.model.get('name'));
    return this;
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
  }
});

