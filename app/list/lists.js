var app = app || {};

app.Lists = Backbone.Collection.extend({
  url: '/lists',
  model: app.List,
  localStorage: new Backbone.LocalStorage('lists')
});

