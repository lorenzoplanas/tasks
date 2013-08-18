define([
  'underscore',
  'backbone',
  'backbone.localstorage',
  './list'
], function(_, Backbone, discarded, List) {
  var Lists = Backbone.Collection.extend({
    url: '/lists',
    model: List,
    localStorage: new Backbone.LocalStorage('lists')
  });

  return Lists;
});

