define([
  'underscore',
  'backbone',
  '../task/tasks'
], function(_, Backbone, Tasks) {
  var List = Backbone.Model.extend({
    initialize: function() {
    },

    add_task: function(task) {
      this.tasks.add(task);
    }
  });

  return List;
});

