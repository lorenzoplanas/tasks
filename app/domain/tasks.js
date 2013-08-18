define([
  'underscore',
  'backbone',
  'backbone.localstorage',
  './task'
], function(_, Backbone, discarded, Task) {
  var Tasks = Backbone.Collection.extend({
    model: Task,

    url: function() {
      return("/lists/" + this.list_id + '/tasks');
    },

    initialize: function(models, options) {
      this.list_id = options.list_id;
      this.localStorage = new Backbone.LocalStorage('tasks:' + this.list_id);
    }
  });

  return Tasks;
});

