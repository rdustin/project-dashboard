/**
 * View that displays the project details in the project list
 * @author Randy Dustin <randydustin@gmail.com>
 */
var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var Templates = require('templates/compiledTemplates')(Handlebars);

var ProjectView = Backbone.View.extend({
    template: Templates['/project'],

    initialize: function(options) {
        this.router = options.router;
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
});
module.exports = ProjectView;