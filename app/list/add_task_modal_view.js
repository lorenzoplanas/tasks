define([
  'underscore',
  'backbone',
  '../task/task',
  '../bus'
], function(_, Backbone, Task, Bus) {
  var AddTaskModalView = Backbone.View.extend({
    tagName: 'div',
    className: 'modal',

    events : {
      "click .close" : "close",
      "submit form" : "create_task"
    },

    initialize: function(options) {
      this.list_id = options.list_id
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
      attributes = { 
        name:     this.$('input').val(),
        list_id:  this.list_id
      };

      Bus.trigger('task:create', attributes);
      this.close();
    },

    close: function() {
      event.preventDefault();
      Bus.off(null, null, this);
      this.off();
      this.remove();
    }
  });

  return AddTaskModalView;
});

