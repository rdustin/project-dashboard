/**
 * View that provides form for adding a new project
 * @author Randy Dustin <randydustin@gmail.com>
 */
var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var Templates = require('templates/compiledTemplates')(Handlebars);

var Project = require('models/project');

var NewProject = Backbone.View.extend({
    tagName: '#item-box',
    template: Templates['/newProject'],

    events: {
        'click #saveNewProject': 'saveProject'
    },

    render: function() {
        Backbone.Validation.bind(this, {
            model: this.model,
            valid: function (view, attr) {
                var $group = $('form#add-project [name="' + attr + '"]').closest('.form-group');
                $group.removeClass('has-error');
                $group.find('.help-block').html('').addClass('hidden');
            },
            invalid: function (view, attr, error) {
                var $group = $('form#add-project [name="' + attr + '"]').closest('.form-group');
                $group.addClass('has-error');
                $group.find('.help-block').html(error).removeClass('hidden');
            }
        });
        this.$el.html(this.template({users: this.users.toJSON()}));
        return this;
    },

    saveProject: function (ev) {
        ev.preventDefault();
        var that = this;
        var data = $('form#add-project').serializeObject();
        this.model.set(data);
        if(this.model.isValid(true)) {
            this.model.save(data, {
                beforeSend: that.router.sendAuthentication,
                wait: true,
                success: function (model, response) {
                    that.router.navigate('#projects/' + model.id, true);
                }
            });
        }
    },

    initialize: function (options) {
        this.router = options.router;
        this.users = options.users;
        this.model = new Project({users: this.users});
        this.listenTo(this.model, 'change', this.render);
    }
});
module.exports = NewProject;