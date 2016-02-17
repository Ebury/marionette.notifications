'use strict';

/* global Marionette, $ */

var App = Marionette.Application.extend({
  initialize: function () {
    console.log('yep');
  }
});

var app = new App();

var MainView = Marionette.ItemView.extend({
  el: 'body',
  template: false,

  ui: {
    addNotification: '.js-add-notification'
  },

  events: {
    'click @ui.addNotification': 'addNotification'
  },

  addNotification: function (e) {
    var notificationType = $(e.currentTarget).data('notification-type');
    var message = 'This is a ' + notificationType + ' notification';
    app.addNotification(notificationType, message);
  }
});

var mainView = new MainView();
mainView.render();

app.start();
