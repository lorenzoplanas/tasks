var app = app || {};
var TASKS_PER_LIST = 5;

var generate_sample_tasks = function(list, index) {
  for (j = 0; j < TASKS_PER_LIST; j ++) {
    task_id   = (index + 1) + '.' + (j + 1);
    task = new app.Task({
      list_id:  list.get('id'),
      name:     'Task ' + task_id
    });

    list.add_task(task);
    list.save();
    task.save();
  }
};

app.lists = new app.Lists();

for (i = 0; i < 3; i++) {
  list = new app.List({ name: 'List ' + (i + 1) });
  app.lists.add(list);
  list.save();
  list.tasks = new app.Tasks([], { list_id: list.get('id') });
  list.tasks.bind('change', this.save);
  generate_sample_tasks(list, i);
}

app.lists_view = new app.ListsView({ collection: app.lists });
app.lists_view.render();
