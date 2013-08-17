var app = app || {};

app.List = Backbone.Model.extend({
  add_task: function(task) {
    this.tasks.add(task);
  }
});

