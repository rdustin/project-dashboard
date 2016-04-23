/**
 * View that displays the user's current details
 * @author Randy Dustin <randydustin@gmail.com>
 */
var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
require('jquery.cookie');

var Templates = require('templates/compiledTemplates')(Handlebars);

var UserDetails = Backbone.View.extend({
    tagName: '#user-box',
    template: Templates['/userDetails'],

    render: function () {
        Backbone.Validation.bind(this, {
            model: this.model,
            valid: function (view, attr) {
                var $group = $('form#edit-user-form [name="' + attr + '"]').closest('.form-group');
                $group.removeClass('has-error');
                $group.find('.help-block').html('').addClass('hidden');
            },
            invalid: function (view, attr, error) {
                var $group = $('form#edit-user-form [name="' + attr + '"]').closest('.form-group');
                $group.addClass('has-error');
                $group.find('.help-block').html(error).removeClass('hidden');
            }
        });
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    initialize: function (options) {
        this.router = options.router;
    }
});
module.exports = UserDetails;