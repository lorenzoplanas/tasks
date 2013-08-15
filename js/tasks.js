var on_dragstart = function(event) {
  var id = event.target.getAttribute('id');
  event.originalEvent.dataTransfer.setData("text/plain", id);
}

var on_dragover = function(event) {
  event.preventDefault();
}

var on_drop = function(event) {
  event.preventDefault();
  var id      = event.originalEvent.dataTransfer.getData("text/plain");
  var task    = document.getElementById(id);
  var target  = $(event.target);

  drop_task(target, task);
}

var create_task = function(list, task_name, id) {
  task = $('<li/>').html(task_name)
          .prop('id', id)
          .prop('draggable', true)
          .addClass('task');

  task.bind('dragstart', on_dragstart);
  list.append(task);
}

var generate_sample_tasks = function(lists) {
  var tasks_per_list = 5;
  for (i = 0; i < lists.length; i++) {
    list = $(lists[i]);

    for (j = 0; j < tasks_per_list; j ++) {
      task_id   = (i + 1) + '.' + (j + 1);
      task_name = 'Task ' + task_id;
      create_task(list, task_name, task_id);
    }
  }
}

var drop_task = function(target, task) {
  var tag = target.prop('tagName').toLowerCase()
  if (tag == 'ul')
    target.append(task);

  if (tag == 'li')
    target.after(task);
}

var generate_sample_list = function(id, index) {
  list    = $('<ul />')
  header  = $('<li />').html('List ' + index).addClass('header')

  list.bind('dragover', on_dragover);
  list.bind('drop', on_drop);
  list.append(header);
  $('#' + lists_id).append(list);
}

var lists_id = 'lists'
for (i = 0; i < 3; i++)
  generate_sample_list(lists_id, i + 1);

var lists = $('#' + lists_id).children();
generate_sample_tasks(lists);

