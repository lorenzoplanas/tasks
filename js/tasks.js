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
  for (i = 1; i <= lists.length; i++) {
    list = $(lists[i - 1]);

    for (j = 1; j < 4; j ++) {
      task_id   = i + '.' + j;
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

var lists = $('#lists ul');
generate_sample_tasks(lists);

lists.bind('dragover', on_dragover);
lists.bind('drop', on_drop);

