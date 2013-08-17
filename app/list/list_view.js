var app = app || {};

app.ListView = Backbone.View.extend({
  tagName: 'ul',
  events: {
    "dragover"      : "on_dragover",
    "drop"          : "on_drop",
    "click .header .add"  : "add_task_modal",
  },

  render: function() {
    link    = "<a href='#' class='add'>+</a>";
    markup  = this.model.get('name') + link;

    this.$el.append(
      $('<li />').html(markup).addClass('header')
    );
    var tasks = this.model.tasks;
    tasks.fetch();
    for (i = 0; i < tasks.length; i ++) {
      var task = tasks.at(i);
      var task_view = new app.TaskView({ id: task.get('id'), model: task });
      this.$el.append(task_view.render().$el);
    }
    
    return this;
  },

  add_task_modal: function(event) {
    event.preventDefault();
    this.modal = new app.AddTaskModalView();
    this.modal.render();
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
    var list    = app.lists.get(list_id);
    list.tasks.fetch();
    var task    = list.tasks.get(task_id);
    var task_markup = document.getElementById(task_id);

    if (task) {
      this.model.add_task(task);
      list.tasks.pop(task_id);

      this.model.save();
      list.save();

      this.$el.append(task_markup);
    }
  }
});
