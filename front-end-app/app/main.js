/**
 * starting file for the application's javascript
 * @author Randy Dustin <randydustin@gmail.com>
 */
var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var PdRouter = require('routers/pd');

/* Show loading animation any time an ajax action is taking place */
$(document).ajaxStart(function(){ $("#loading-indicator").fadeIn(); });
$(document).ajaxComplete(function(){ $("#loading-indicator").fadeOut(); });

$(document).ready(function(){
    /* start the router with history */
    var router = new PdRouter({el: $('#pd-app')});
    Backbone.history.start();

    /* spinner animation options and instantiation */
    var opts = {
      lines: 13, // The number of lines to draw
      length: 0, // The length of each line
      width: 10, // The line thickness
      radius: 30, // The radius of the inner circle
      corners: 1, // Corner roundness (0..1)
      rotate: 0, // The rotation offset
      direction: 1, // 1: clockwise, -1: counterclockwise
      color: '#000', // #rgb or #rrggbb or array of colors
      speed: 1, // Rounds per second
      trail: 60, // Afterglow percentage
      shadow: false, // Whether to render a shadow
      hwaccel: false, // Whether to use hardware acceleration
      className: 'spinner', // The CSS class to assign to the spinner
      zIndex: 2e9, // The z-index (defaults to 2000000000)
      top: '50%', // Top position relative to parent
      left: '50%' // Left position relative to parent
    };
    var target = document.getElementById('loading-indicator');
    var spinner = new Spinner(opts).spin(target);


});

//from: https://github.com/hongymagic/jQuery.serializeObject
$.fn.serializeObject=function(){"use strict";var a={},b=function(b,c){var d=a[c.name];"undefined"!=typeof d&&d!==null?$.isArray(d)?d.push(c.value):a[c.name]=[d,c.value]:a[c.name]=c.value};return $.each(this.serializeArray(),b),a};