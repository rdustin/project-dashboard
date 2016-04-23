/**
 * View that provides editing and updating of projects
 * @author Randy Dustin <randydustin@gmail.com>
 */
var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
require('jquery.cookie');

var Users = require('collections/users');
var users = new Users();

var Templates = require('templates/compiledTemplates')(Handlebars);

var ProjectEdit = Backbone.View.extend({
    tagName: '#user-box',
    template: Templates['/projectEdit'],

    events: {
        'click #update-project': 'updateProject',
    },

    render: function () {
        var that = this;
        this.defferedUser = users.fetch({beforeSend: that.router.sendAuthentication});
        this.users = users;
        this.defferedUser.done(function(){
            var currentUserId = $.cookie('id');
            var projectUsers = that.model.toJSON();
            var allUsers = that.users.toJSON();
            /*
             * we need to loop through all users and mark which ones have access to the project
             * so we can display the checkboxes correctly
             */
            if(projectUsers['userIds']) {
                for(i=0;i<allUsers.length;i++) {
                    for(j=0;j<projectUsers['userIds'].length;j++) {
                        if(allUsers[i]['id'] == projectUsers['userIds'][j]) {
                            allUsers[i]['isUsers'] = true;
                        }
                    }
                }
            } else {
                for(i=0;i<allUsers.length;i++) {
                    for(j=0;j<projectUsers['ownUser'].length;j++) {
                        if(allUsers[i]['id'] == projectUsers['ownUser'][j]['id']) {
                            allUsers[i]['isUsers'] = true;
                        }
                    }
                }
            }

            if(that.model.get('status') == 'active') {
                that.model.set('isActive', true);
            }
            that.model.set('allUsers', allUsers);
            Backbone.Validation.bind(that, {
                model: that.model,
                valid: function (view, attr) {
                    var $group = $('form#edit-project-form [name="' + attr + '"]').closest('.form-group');
                    $group.removeClass('has-error');
                    $group.find('.help-block').html('').addClass('hidden');
                },
                invalid: function (view, attr, error) {
                    var $group = $('form#edit-project-form [name="' + attr + '"]').closest('.form-group');
                    $group.addClass('has-error');
                    $group.find('.help-block').html(error).removeClass('hidden');
                }
            });
            if($.cookie('role') == 'administrator') {
                that.model.set('administrator', true);
            }
            that.$el.html(that.template(that.model.toJSON()));
            return that;
        })
        .fail(function (response) {
            that.router._handleFail(response);
        });
    },

    updateProject: function (ev) {
        ev.preventDefault();
        var that = this;
        var data = $('form#edit-project-form').serializeObject();
        this.model.set(data);
        if(this.model.isValid(true)) {
            this.model.save(data, {
                beforeSend: this.router.sendAuthentication,
                url: 'https://project-dashboard.dev/api/projects/' + this.model.id,
                wait: true,
                success: function (model, response) {
                    that.router.navigate('#projects/' + model.id, true);
                    that.undelegateEvents();
                },
                error: function (model, response) {

                }
            });
        }
    },

    initialize: function (options) {
        this.router = options.router;
        this.projects = options.projects;
    }
});
module.exports = ProjectEdit;