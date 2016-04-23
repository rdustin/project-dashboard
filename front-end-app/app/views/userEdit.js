/**
 * View that facilitates editing of user details
 * including access to projects
 * @author Randy Dustin <randydustin@gmail.com>
 */
var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
require('jquery.cookie');

var Projects = require('collections/projects');
var projects = new Projects();

var Templates = require('templates/compiledTemplates')(Handlebars);

var UserEdit = Backbone.View.extend({
    tagName: '#user-box',
    template: Templates['/userEdit'],

    events: {
        'click #update-user': 'updateUser',
    },

    render: function () {
        var that = this;
        this.deferredProject = projects.fetch({beforeSend: that.router.sendAuthentication});
        this.projects = projects;
        this.deferredProject.done(function(){
            var currentUserId = $.cookie('id');
            var userProjects = that.model.toJSON();
            var allProjects = that.projects.toJSON();
            /*
             * we need to loop through all projects and mark which ones the user has access to
             * so we can display the checkboxes correctly
             */
            if(userProjects['projectIds']) {
                for(i=0;i<allProjects.length;i++) {
                    for(j=0;j<userProjects['projectIds'].length;j++) {
                        if(allProjects[i]['id'] == userProjects['projectIds'][j]) {
                            allProjects[i]['isUsers'] = true;
                        }
                    }
                }
            } else {
                for(i=0;i<allProjects.length;i++) {
                    for(j=0;j<userProjects['sharedProject'].length;j++) {
                        if(allProjects[i]['id'] == userProjects['sharedProject'][j]['id']) {
                            allProjects[i]['isUsers'] = true;
                        }
                    }
                }
            }

            that.model.set('allProjects', allProjects);
            /* need to validate the form input and display errors when necessary */
            Backbone.Validation.bind(that, {
                model: that.model,
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
            if(that.model["attributes"]["role"] == 'administrator') {
                that.model.set('administrator', true);
            }
            that.$el.html(that.template(that.model.toJSON()));
            return that;
        })
        .fail(function (response) {
            that.router._handleFail(response);
        });
    },

    updateUser: function (ev) {
        ev.preventDefault();
        var that = this;
        var data = $('form#edit-user-form').serializeObject();
        this.model.set(data);
        if(this.model.isValid(true)) {
            delete data['confirm_email'];
            this.model.save(data, {
                beforeSend: this.router.sendAuthentication,
                url: 'https://project-dashboard.dev/api/users/' + this.model.id,
                wait: true,
                success: function (model, response) {
                    that.router.navigate('#users/' + model.id, true);
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
module.exports = UserEdit;