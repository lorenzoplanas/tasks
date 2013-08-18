define([
  'backbone'
], function(Backbone) {
  var Mediator = Backbone.Model.extend({
    initialize: function(lists) {
      this.lists = lists;
    },

    transfer_task: function(task_id, origin_list_id, destination_list_id) {
      if (origin_list_id == destination_list_id) { 
        return(this);
      }

      origin_list       = lists.get(origin_list_id);
      destination_list  = lists.get(destination_list_id);
      task              = origin_list.get_task(task_id);

      origin_list       .remove_task(task);
      destination_list  .add_task(task);
      task.save();
      return(this);
    }
  });

  return Mediator;
});

