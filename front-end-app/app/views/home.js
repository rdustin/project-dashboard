/**
 * View that provides the basic container for the
 * rest of the views
 * @author Randy Dustin <randydustin@gmail.com>
 */
var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var Templates = require('templates/compiledTemplates')(Handlebars);

var HomeView = Backbone.View.extend({
    tagName: 'div',
    className: 'home',
    template: Templates['/home'],

    initialize: function(options) {
        this.router = options.router;
    },

    render: function() {
        this.$el.html(this.template());
        return this;
    }
});
module.exports = HomeView;