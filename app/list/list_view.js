define([
  'underscore',
  'backbone',
  '../task/task_view',
  './add_task_modal_view',
  '../bus',
  '../task/task'
], function(_, Backbone, TaskView, AddTaskModalView, Bus, Task) {
  var ListView = Backbone.View.extend({
    tagName: 'ul',
    events: {
      "dragover"            : "on_dragover",
      "drop"                : "on_drop",
      "click .header .add"  : "add_task_modal",
    },

    initialize: function() {
    },

    render: function() {
      Bus.bind('task:create', this.create_task, this);
      link    = "<a href='#' class='add'>+</a>";
      markup  = this.model.get('name') + link;

      this.$el.append($('<li />').html(markup).addClass('header'));

      var tasks = this.model.tasks;
      tasks.fetch();

      for (i = 0; i < tasks.length; i ++) {
        var task = tasks.at(i);
        var task_view = new TaskView({ id: task.get('id'), model: task });
        this.$el.append(task_view.render().$el);
      }
      
      return this;
    },

    add_task_modal: function(event) {
      event.preventDefault();
      (new AddTaskModalView({ list_id: this.model.id })).render();
    },

    create_task: function(args) {
      if (args.list_id != this.model.id)
        return(this);

      var task = new Task(attributes);
      this.model.tasks.add(task);
      task.save();
      this.render();
    },

    on_dragover: function(event) {
      event.preventDefault();
    },

    on_drop: function(event) {
      event.preventDefault();
      var payload = event.originalEvent.dataTransfer
                      .getData("text/plain")
                      .split(':');
      var task_id = payload[0];
      var list_id = payload[1];
      var list    = window.lists.get(list_id);

      list.tasks.fetch();
      var task    = list.tasks.get(task_id);
      var task_markup = document.getElementById(task_id);

      if (task) {
        this.model.add_task(task);
        list.tasks.pop(task_id);
        list.save();
        this.$el.append(task_markup);
      }
    }
  });

  return ListView;
});
