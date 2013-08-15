$('#lists .task').bind('dragstart', function(event) {
  var id = event.target.getAttribute('id');
  event.originalEvent.dataTransfer.setData("text/plain", id);
});

$('#lists ul').bind('dragover', function(event) {
  event.preventDefault();
});

$('#lists ul').bind('drop', function(event) {
  event.preventDefault();
  var id      = event.originalEvent.dataTransfer.getData("text/plain");
  var element = document.getElementById(id);
  var target  = $(event.target);

  if (target.prop('tagName').toLowerCase() == 'ul') {
    target.append(element);
  }

  if (target.prop('tagName').toLowerCase() == 'li') {
    target.after(element);
  }
});

