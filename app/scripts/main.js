'use strict';

/* global Marionette, $ */

var DefaultApp = Marionette.Application.extend({});
var CustomApp = Marionette.Application.extend({
  notificationTemplate: '.js-custom-notification-template',
  notificationViewEl: '.js-custom-notifications-view',
  notificationAutoremove: false,
  notificationAnimation: false
});

var TabView = Marionette.ItemView.extend({
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
    this.options.app.addNotification(notificationType, message);
  }
});

var defaultApp = new DefaultApp();
var customApp = new CustomApp();

defaultApp.on('start', function () {
  this.view = new TabView({
    el: '#default',
    app: defaultApp
  });
  this.view.render();
});

customApp.on('start', function () {
  this.view = new TabView({
    el: '#custom',
    app: customApp
  });
  this.view.render();
});

defaultApp.start();
