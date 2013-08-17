define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  var bus = _.clone(Backbone.Events);
  return(bus);
});

