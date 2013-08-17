require.config({
  "baseUrl": "./app",
  "paths": {
    "jquery":                 "../js/jquery.min",
    "underscore":             "../js/underscore.min",
    "backbone":               "../js/backbone.min",
    "backbone.localstorage":  "../js/backbone.localStorage.min"
  },
  "shim": {
    'backbone.localstorage': {
      deps:     ['backbone'],
      exports:  'Backbone.LocalStorage'
    }
  }
});

require(["./main"]);

