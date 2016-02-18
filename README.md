# marionette.notifications

Global notifications for a Marionette application.

## How to use

### Download

**Bower**

```sh
bower install marionette.notifications --save
```

**Old skool**

Download the JavaScript [https://github.com/Ebury/marionette.notifications/tree/master/dist](source files) and include 
the preferred version (standard or minified) in your HTML after including the Marionette files.

```html
<script src="<path-to-scripts>/marionette.notifications.js"></script>
```

### Include a notifications container
 
You need to create a notification container in your base HTML template. By default, the add-on looks for a container
with the `js-notifications-view` class.

```html
<div class="js-notifications-view"></div>
```

### Add a notification template 

Every time you add a global notification, the add-on will render a template associated to the internal notification
model of the add-on. By default, the add-on looks for a template included in a element with the 
`js-notification-template` class.

You have access to two properties of the model in the template: `type` and `message`. These properties are defined when
you add a global notification as explained below.

```html
<script type="text/template" class="js-notification-template">
  <div class="alert alert-<%= type %> alert-dismissible" role="alert">
    <button type="button" class="close js-notification-close" data-dismiss="alert">&times;</button>
    <strong><%= message %></strong>
  </div>
</script>
```

### Creates a Marionette application

```js
var app = new Marionette.Application();
```

### Add a notification

```js
app.addNotification('success', 'This is a success notification');
```

## Options

TODO

## Demo
[http://ebury.github.io/marionette.notifications/](http://ebury.github.io/marionette.notifications/) 
