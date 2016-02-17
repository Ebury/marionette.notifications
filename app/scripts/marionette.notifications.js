'use strict';

/* globals Marionette, Backbone */

var oldConstructor = Marionette.Application;

Marionette.Application = Marionette.Application.extend({

  notificationTemplate: '.js-notification-template',
  notificationViewEl: '.js-notifications-view',
  notificationCloseSelector: '.js-notification-close',
  notificationAutoremove: true,
  notificationAutoremoveAfter: 10,
  notificationAnimation: true,

  /**
   * Getter for the Backbone model class used to handle a single notification
   * @returns {object} Notification model class
   * @private
   */
  get _notificationModel() {
    return Backbone.Model.extend({
      defaults: {
        type: null,
        message: null
      }
    });
  },

  /**
   * Getter for the Backbone collection class used to handle a list of notifications
   * @returns {object} Notification collection class
   * @private
   */
  get _notificationCollection() {
    return Backbone.Collection.extend({
      model: this._notificationModel
    });
  },

  /**
   * Getter for the Marionette ItemView class used to render a single notification
   * @returns {object} Notification view class
   * @private
   */
  get _notificationView() {
    return Marionette.ItemView.extend({
      template: this.notificationTemplate,

      ui: {
        closeButton: this.notificationCloseSelector
      },

      events: {
        'click @ui.closeButton': 'close'
      },

      /**
       * Initializes the view after being rendered and added to the DOM
       */
      init: function () {
        var _this = this;

        if (this.options.notificationAnimation) {
          // Notification appears with a slideDown animation
          this.$el.hide();
          this.$el.slideDown();
        }

        if (this.options.notificationAutoremove) {
          // Auto-removes the notification after notificationAutoremoveAfter seconds
          this.to = setTimeout(function () {
            _this.close();
          }, this.options.notificationAutoremoveAfter*1000);
        }
      },

      /**
       * Destroys a notification
       * @param e {Event} event that has executed this method
       */
      close: function (e) {
        // Clear the timeout for auto-removing the notification
        clearTimeout(this.to);

        if (e) {
          e.stopPropagation();
        }

        var _this = this;

        if (this.options.notificationAnimation) {
          // Hide the notification with a slideUp animation and then it is destroyed
          this.$el.slideUp(function () {
            _this.model.destroy();
          });
        } else {
          _this.model.destroy();
        }
      }
    });
  },

  /**
   * Getter for the Marionette CollectionView class used to render a list of notifications
   * @returns {object} Notifications view class
   * @private
   */
  get _notificationsView() {
    return Marionette.CollectionView.extend({
      childView: this._notificationView,

      onAddChild: function(childView){
        childView.init();
      },

      childViewOptions: function(model, index) {
        return {
          notificationAnimation: this.options.notificationAnimation,
          notificationAutoremove: this.options.notificationAnimation,
          notificationAutoremoveAfter: this.options.notificationAutoremoveAfter
        };
      }
    });
  },

  /**
   * Creates a notifications view with the given options. View is attached to the application, so it's accessible later
   * in the notificationsView property of the application
   * @param options {object} dict passed to the notifications view class. If no el or collection properties are given,
   * then the default ones are used (notificationsView value and a new instance of the notification collection class)
   * @returns {object} Notifications view instance
   */
  createNotificationsView: function (options) {
    options = options || {};
    var extendedOptions = _.extend({
      el: this.notificationViewEl,
      collection: new this._notificationCollection(),
      notificationAnimation: this.notificationAnimation,
      notificationAutoremove: this.notificationAutoremove,
      notificationAutoremoveAfter: this.notificationAutoremoveAfter
    }, options);
    this.notificationsView = new this._notificationsView(extendedOptions);
    this.notificationsView.render();
    return this.notificationsView;
  },

  /**
   * Adds a new notification to the notifications view of the application
   * @param type {string} type of notification. This variable is used in used in the default notification template
   * @param message {string} message of the notification. This variable is used in the default notification template
   */
  addNotification: function (type, message) {
    if (this.notificationsView) {
      this.notificationsView.collection.unshift(new this._notificationModel({
        type: type,
        message: message
      }));
    }
  },

  /**
   * New constructor of the Marionette Application. It does the sames as the original constructor and it creates a
   * notifications view using the default options
   */
  constructor: function () {
    oldConstructor.apply(this, arguments);
    this.createNotificationsView();
  }
});

