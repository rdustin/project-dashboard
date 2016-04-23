/**
 * View that show the error page
 * @author Randy Dustin <randydustin@gmail.com>
 */

var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var Templates = require('templates/compiledTemplates')(Handlebars);

var PageError = require('models/pageError');

var showError = Backbone.View.extend({
    tagName: '#item-box',
    template: Templates['/showError'],

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    initialize: function (options) {
        this.router = options.router;
        this.pageError = options.model;
    }
});
module.exports = showError;