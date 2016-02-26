/* globals assert, expect, sinon, Marionette */

(function () {
  'use strict';

  describe('when creating an application with the default config', function() {
    beforeEach(function() {
      this.stub = sinon.stub(Marionette.Renderer, 'render');
      this.app = new Marionette.Application();
      this.app.start();
    });

    afterEach(function() {
      this.stub.restore();
    });

    it('should have the default template', function () {
      assert.equal('.js-notification-template', this.app.notificationTemplate);
    });

    it('should have the default view element container', function () {
      assert.equal('.js-notifications-view', this.app.notificationViewEl);
    });

    it('should have the default selector for the element that closes a notification', function () {
      assert.equal('.js-notification-close', this.app.notificationCloseSelector);
    });

    it('should have the default value for the flag that indicates if a notification has to be auto-removed', function () {
      assert.isOk(this.app.notificationAutoremove);
    });

    it('should have the default time that application waits before remove automatically a notification', function () {
      assert.equal(10, this.app.notificationAutoremoveAfter);
    });

    it('should have the default value for the flag that indicates if a notification has to be animated when showing or hiding it', function () {
      assert.isOk(this.app.notificationAnimation);
    });
  });

  describe('when creating an application with a custom config', function() {
    beforeEach(function() {
      this.stub = sinon.stub(Marionette.Renderer, 'render');
      this.config = {
        notificationTemplate: '.js-custom-notification-template',
        notificationViewEl: '.js-custom-notifications-view',
        notificationCloseSelector: '.js-custom-notification-close',
        notificationAutoremove: false,
        notificationAutoremoveAfter: 1,
        notificationAnimation: false
      };
      this.app = new Marionette.Application(this.config);
      this.app.start();
    });

    afterEach(function() {
      this.stub.restore();
    });

    it('should have the custom template', function () {
      assert.equal(this.config.notificationTemplate, this.app.notificationTemplate);
    });

    it('should have the custom view element container', function () {
      assert.equal(this.config.notificationViewEl, this.app.notificationViewEl);
    });

    it('should have the custom selector for the element that closes a notification', function () {
      assert.equal(this.config.notificationCloseSelector, this.app.notificationCloseSelector);
    });

    it('should have the custom value for the flag that indicates if a notification has to be auto-removed', function () {
      assert.equal(this.config.notificationAutoremove, this.app.notificationAutoremove);
    });

    it('should have the custom time that application waits before remove automatically a notification', function () {
      assert.equal(this.config.notificationAutoremoveAfter, this.app.notificationAutoremoveAfter);
    });

    it('should have the custom value for the flag that indicates if a notification has to be animated when showing or hiding it', function () {
      assert.equal(this.config.notificationAnimation, this.app.notificationAnimation);
    });
  });

  describe('when adding a global notification to the application', function() {
    beforeEach(function () {
      this.stub = sinon.stub(Marionette.Renderer, 'render');
      this.app = new Marionette.Application();
      this.app.start();

      this.notificationType = 'success';
      this.notificationMessage = 'test message';
      this.app.addNotification(this.notificationType, this.notificationMessage);
    });

    afterEach(function() {
      this.stub.restore();
    });

    it('should have a new notification model in the notifications collection', function () {
      expect(this.app.notificationsView.collection.length).to.equal(1);
    });

    it('should have a new notification model with the specified type', function () {
      expect(this.app.notificationsView.collection.models[0].get('type')).to.equal(this.notificationType);
    });

    it('should have a new notification model with the specified message', function () {
      expect(this.app.notificationsView.collection.models[0].get('message')).to.equal(this.notificationMessage);
    });
  });
})();
