/**
 * View that provides a form for adding a new user
 * @author Randy Dustin <randydustin@gmail.com>
 */
var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var Templates = require('templates/compiledTemplates')(Handlebars);

var User = require('models/user');

var NewUser = Backbone.View.extend({
    tagName: '#item-box',
    template: Templates['/newUser'],

    events: {
        'click #saveNewUser': 'saveUser'
    },

    render: function() {
        Backbone.Validation.bind(this, {
            model: this.model,
            valid: function (view, attr) {
                var $group = $('form#add-user [name="' + attr + '"]').closest('.form-group');
                $group.removeClass('has-error');
                $group.find('.help-block').html('').addClass('hidden');
            },
            invalid: function (view, attr, error) {
                var $group = $('form#add-user [name="' + attr + '"]').closest('.form-group');
                $group.addClass('has-error');
                $group.find('.help-block').html(error).removeClass('hidden');
            }
        });
        this.$el.html(this.template({projects: this.projects.toJSON()}));
        return this;
    },

    saveUser: function (ev) {
        ev.preventDefault();
        var that = this;
        var data = $('form#add-user').serializeObject();
        this.model.set(data);
        if(this.model.isValid(true)) {
            delete data['confirm_email'];
            this.model.save(data, {
                beforeSend: that.router.sendAuthentication,
                wait: true,
                success: function (model, response) {
                    that.router.navigate('#users/' + model.id, true);
                    that.undelegateEvents();
                },
                error: function(model, response) {
                    if(response.status == 409) {
                        $emailGroup = $('form#add-user [name="email"]').closest('.form-group');
                        $emailGroup.addClass('has-error');
                        $emailGroup.find('.help-block').html('This email address is already taken').removeClass('hidden');
                    } else {
                        that.router._handleFail(response);
                    }
                }
            });
        }
    },

    initialize: function (options) {
        this.router = options.router;
        this.projects = options.projects;
        this.model = new User({projects: this.projects});
    }
});
module.exports = NewUser;