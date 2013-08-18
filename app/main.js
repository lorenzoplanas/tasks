define([
  'underscore',
  'backbone',
  './list/list',
  './list/lists',
  './task/task',
  './task/tasks',
  './list/lists_view'
], function(_, Backbone, List, Lists, Task, Tasks, ListsView) {
  var TASKS_PER_LIST = 5;

  var generate_sample_tasks = function(list, index) {
    for (j = 0; j < TASKS_PER_LIST; j ++) {
      task_id   = (index + 1) + '.' + (j + 1);

      task = new Task({
        list_id:  list.get('id'),
        name:     'Task ' + task_id
      });

      list.add_task(task);
      task.save();
    }
  };

  lists       = new Lists();
  lists_view  = new ListsView({ collection: lists });

  for (i = 0; i < 3; i++) {
    list = new List({ name: 'List ' + (i + 1) });
    lists.add(list);
    list.save();
    list.tasks = new Tasks([], { list_id: list.id });
    list.tasks.bind('change', this.save);
    generate_sample_tasks(list, i);
  }

  lists_view.render();
});

