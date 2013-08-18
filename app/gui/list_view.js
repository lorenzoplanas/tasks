define([
  'underscore',
  'backbone',
  '../domain/bus',
  '../domain/task',
  './task_view',
  './add_task_modal_view'
], function(_, Backbone, Bus, Task, TaskView, AddTaskModalView) {
  var ListView = Backbone.View.extend({
    tagName: 'ul',
    events: {
      "dragover"            : "on_dragover",
      "drop"                : "on_drop",
      "click .header .add"  : "add_task_modal",
      "click .header .name" : "edit_name",
      "submit form"         : "rename"
    },

    initialize: function(options) {
      this.task_views     = [];
      this.list_mediator  = options.list_mediator;
      Bus.bind('task:create', this.create_task, this);
    },

    render: function() {
      this.model.tasks.on('add', this.render, this);
      this.model.tasks.on('remove', this.render, this);

      this.remove_task_views();
      this.$el.empty();
      this.render_header();
      this.render_tasks();
      return(this);
    },

    edit_name: function() {
      this.$el.find('.header').remove();
      this.$el.prepend(
        '<li class="header">' +
          '<form>'  +
            '<input type="text" value="' + this.model.get('name')  + '">' +
          '</form>' +
        '</li>'
      );
      return(this);
    },

    rename: function() {
      new_name = this.$el.find('.header input:first').val();
      this.model.save({ name: new_name });
      this.$el.find('.header').remove();
      this.render_header();
      return(this);
    },

    render_header: function() {
      link    = "<a href='#' class='add'>+</a>";
      name    = '<span class="name">' + this.model.get('name') + "</span>" 
      markup  = name + link;

      this.$el.prepend($('<li />').html(markup).addClass('header'));
      return(this);
    },

    render_tasks: function() {
      for (i = 0; i < this.model.tasks.length; i++) {
        var task      = this.model.tasks.at(i);
        var task_view = new TaskView({ id: task.get('id'), model: task });
        this.task_views.push(task_view);
        this.$el.append(task_view.render().$el);
      }

      return(this);
    },

    remove_task_views: function() {
      for (i = 0; i < this.task_views.length; i++) {
        this.task_views[i].close();
      }
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
