var app = app || {};

app.Tasks = Backbone.Collection.extend({
  model: app.Task,

  url: function() {
    console.log('in url: ' + this.list_id);
    return("/lists/" + this.list_id + '/tasks');
  },

  initialize: function(models, options) {
    this.list_id = options.list_id;
    this.localStorage = new Backbone.LocalStorage('tasks:' + this.list_id);
  }
});

