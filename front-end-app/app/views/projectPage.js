/**
 * View that displays project information as well
 * as any discussions associated with the project
 * @author Randy Dustin <randydustin@gmail.com>
 */
var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var Templates = require('templates/compiledTemplates')(Handlebars);

var ProjectPage = Backbone.View.extend({
    tagName: '#item-box',
    template: Templates['/projectPage'],

    render: function() {
        if($.cookie('role') == 'administrator') {
            this.model.set('administrator', true);
        }
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    initialize: function (options) {
        this.router = options.router;
        this.listenTo(this.model, 'change', this.render);
    }
});
module.exports = ProjectPage;