/**
 * View that shows the user info on the user list page
 * @author Randy Dustin <randydustin@gmail.com>
 */
var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var Templates = require('templates/compiledTemplates')(Handlebars);

var UserView = Backbone.View.extend({
    template: Templates['/user'],

    initialize: function(options) {
        this.router = options.router;
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
});
module.exports = UserView;