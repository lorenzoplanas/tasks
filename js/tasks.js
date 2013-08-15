$('#lists .task').bind('dragstart', function(event) {
  var element_html = $(event.target).prop("outerHTML");
  event.originalEvent.dataTransfer.setData("text/plain", element_html);
});

$('#lists ul').bind('dragover', function(event) {
  event.preventDefault();
});

$('#lists ul').bind('drop', function(event) {
  event.preventDefault();
  var element_html = event.originalEvent.dataTransfer.getData("text/plain");
  var target = $(event.target);

  if (target.prop('tagName').toLowerCase() == 'ul') {
    target.append(element_html);
  }

  if (target.prop('tagName').toLowerCase() == 'li') {
    target.after(element_html);
  }
});

