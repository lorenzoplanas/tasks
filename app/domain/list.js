define([
  'underscore',
  'backbone',
  './tasks'
], function(_, Backbone, Tasks) {
  var List = Backbone.Model.extend({
    initialize: function() {
    },

    get_task: function(task_id) {
      return(this.tasks.get(task_id));
    },

    add_task: function(task) {
      task.set('list_id', this.id);
      this.tasks.add(task);
      task.save();
      return(this);
    },

    remove_task: function(task) {
      this.tasks.pop(task);
      return(this);
    }
  });

  return List;
});

