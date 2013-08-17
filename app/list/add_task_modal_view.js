var app = app || {};

app.AddTaskModalView = Backbone.View.extend({
  tagName: 'div',
  className: 'modal',
  events : {
    "click .close" : "close",
    "submit form" : "create_task"
  },

  template:
    '<div class="modal">' +
      '<p>Add task <a href="#" class="close">x</a></p>' +
      '<form>' +
        '<input type="text"></input>' +
      '</form>' +
    '</div>',

  render: function() {
    $('body').append(this.$el.append(this.template));
    return this;
  },

  create_task: function(event) {
    event.preventDefault();
    task_name = this.$('input').val();
    task      = new app.Task({ name: task_name });
    list      = app.lists.at(0);

    list.add_task(task);
    task.save();
    list.save();

    this.remove();
    app.lists_view.render();
  },

  close: function() {
    event.preventDefault();
    this.remove();
  }
});

