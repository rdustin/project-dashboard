/**
 * View that handles display, editing and updating
 * the logged in user
 * @author Randy Dustin <randydustin@gmail.com>
 */
var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
require('jquery.cookie');
var Handlebars = require('handlebars');
var Templates = require('templates/compiledTemplates')(Handlebars);

var Comment = require('models/user');

var UserProfile = Backbone.View.extend({
    tagName: '#item-box',
    template: Templates['/userProfile'],

    events: {
        'click .update-profile': 'updateProfile',
        'click .edit-profile-link': 'editProfile'
    },

    render: function() {
        Backbone.Validation.bind(this, {
            model: this.model,
            valid: function (view, attr) {
                var $group = $('form#edit-profile-form [name="' + attr + '"]').closest('.form-group');
                $group.removeClass('has-error');
                $group.find('.help-block').html('').addClass('hidden');
            },
            invalid: function (view, attr, error) {
                var $group = $('form#edit-profile-form [name="' + attr + '"]').closest('.form-group');
                $group.addClass('has-error');
                $group.find('.help-block').html(error).removeClass('hidden');
            }
        });
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    editProfile: function (ev) {
        ev.preventDefault();
        this.$el.toggleClass('editing');
    },

    updateProfile: function (ev) {
        ev.preventDefault();
        var that = this;
        var data = $('form#edit-profile-form').serializeObject();
        if (data['password'] == '') {
            delete data['password'];
        }
        if (data['password2'] == '') {
            delete data['password2'];
        }
        this.model.set(data);
        if(this.model.isValid(true)) {
            delete data["confirm_email"];
            this.model.save(data, {
                url: 'https://project-dashboard.dev/api/users/profile/' + this.model.id,
                beforeSend: this.router.sendAuthentication,
                wait: true,
                success: function (model, response) {
                    that.$el.toggleClass('editing');
                    that.model.set('password', '');
                    that.model.set('password2', '');
                },
                error: function (model, response) {

                }
            });
        }
    },

    initialize: function (options) {
        this.router = options.router;
        this.listenTo(this.model, 'change', this.render);
    }
});
module.exports = UserProfile;