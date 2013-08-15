var Task = Backbone.Model.extend({
});

var Tasks = Backbone.Collection.extend({
  model: Task,
  localStorage: new Backbone.LocalStorage("todos-backbone")
});

var List = Backbone.Model.extend({
});

var Lists = Backbone.Collection.extend({
  model: List,
  localStorage: new Backbone.LocalStorage("todos-backbone")
});

var TaskView = Backbone.View.extend({
  tagName: 'li',
  className: 'task',
  events: {
    "dragstart" : "on_dragstart",
    "dragover"  : "on_dragover",
    "drop"      : "on_drop"
  },

  initialize: function() {
    this.$el.prop('draggable', true);
  },

  render: function() {
    this.$el.html(this.model.get('name'));
    return this;
  },
  
  on_dragstart: function(event) {
    var id = event.target.getAttribute('id');
    event.originalEvent.dataTransfer.setData("text/plain", id);
  },

  on_dragover: function(event) {
    event.preventDefault();
  },

  on_drop: function(event) {
    event.preventDefault();
    var id      = event.originalEvent.dataTransfer.getData("text/plain");
    var task    = document.getElementById(id);

    this.$el.after(task);
  }
})

var ListsView = Backbone.View.extend({
  el: "#lists",
  render: function() {
    for (k = 0; k < this.collection.length; k++) {
      var list_view = new ListView({ model: this.collection.at(k) });
      this.$el.append(list_view.render().$el);
    };

    return this;
  }
});

var ListView = Backbone.View.extend({
  tagName: 'ul',
  events: {
    "dragover"  : "on_dragover",
    "drop"      : "on_drop"
  },

  render: function() {
    this.$el.append(
      $('<li />').html(this.model.get('name')).addClass('header')
    );
    var tasks = this.model.get('tasks');
    for (i = 0; i < tasks.length; i ++) {
      var task = tasks.at(i);
      var task_view = new TaskView({id: task.get('id'), model: task });
      this.$el.append(task_view.render().$el);
    };
    
    return this;
  },

  on_dragover: function(event) {
    event.preventDefault();
  },

  on_drop: function(event) {
    event.preventDefault();
    var id      = event.originalEvent.dataTransfer.getData("text/plain");
    var task    = document.getElementById(id);
    this.$el.append(task);
  }
});

var generate_sample_tasks = function(lists) {
  var tasks_per_list = 5;
  for (i = 0; i < lists.length; i++) {
    var list = lists.at(i);

    for (j = 0; j < tasks_per_list; j ++) {
      task_id   = (i + 1) + '.' + (j + 1);
      task_name = 'Task ' + task_id;
      task = new Task({ id: task_id, name: task_name });
      list.set('tasks', list.get('tasks').add(task));
    }
  }
};

var lists = new Lists;

for (i = 0; i < 3; i++) {
  list = new List({ name: 'List ' + (i + 1), tasks: new Tasks });
  lists.add(list);
}

generate_sample_tasks(lists);

lists_view = new ListsView({ collection: lists });
lists_view.render();

