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

    initialize: function(options) {
      this.list_mediator = options.list_mediator;
      Bus.bind('task:create', this.create_task, this);
    },

    render: function() {
      this.model.tasks.on('add', this.render_tasks, this);
      this.model.tasks.on('remove', this.render_tasks, this);

      this.model.tasks.fetch();
      this.render_header();
      this.render_tasks();
      return(this);
    },

    render_header: function() {
      link    = "<a href='#' class='add'>+</a>";
      markup  = this.model.get('name') + link;

      this.$el.append($('<li />').html(markup).addClass('header'));
      return(this);
    },

    render_tasks: function() {
      for (i = 0; i < this.model.tasks.length; i ++) {
        var task = this.model.tasks.at(i);
        var task_view = new TaskView({ id: task.get('id'), model: task });
        this.$el.append(task_view.render().$el);
      }
      return(this);
    },

    add_task_modal: function(event) {
      event.preventDefault();
      (new AddTaskModalView({ list_id: this.model.id })).render();
      return(this);
    },

    create_task: function(args) {
      if (args.list_id != this.model.id)
        return(this);

      var task = new Task(attributes);
      this.model.add_task(task);
      return(this);
    },

    on_dragover: function(event) {
      event.preventDefault();
      return(this);
    },

    on_drop: function(event) {
      event.preventDefault();
      var payload = event.originalEvent.dataTransfer
                      .getData("text/plain")
                      .split(':');
      var task_id             = payload[0];
      var origin_list_id      = payload[1];
      var destination_list_id = this.model.id;

      this.list_mediator
        .transfer_task(task_id, origin_list_id, destination_list_id);
      return(this);
    },
  });

  return ListView;
});
