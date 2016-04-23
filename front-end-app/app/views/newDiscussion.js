/**
 * View that provides a form for adding a new discussion
 * @author Randy Dustin <randydustin@gmail.com>
 */
var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var Templates = require('templates/compiledTemplates')(Handlebars);

var Discussion = require('models/discussion');

Handlebars.registerPartial("markdownDescription", Templates['/markdownDescription']);

var NewDiscussion = Backbone.View.extend({
    tagName: '#item-box',
    template: Templates['/newDiscussion'],

    events: {
        'click #saveNewDiscussion': 'saveDiscussion',
        'keypress #saveNewDiscussion': 'updateOnEnter'
    },

    render: function() {
        Backbone.Validation.bind(this, {
            model: this.nDiscussion,
            valid: function (view, attr) {
                var $group = $('form#add-message [name="' + attr + '"]').closest('.form-group');
                $group.removeClass('has-error');
                $group.find('.help-block').html('').addClass('hidden');
            },
            invalid: function (view, attr, error) {
                var $group = $('form#add-message [name="' + attr + '"]').closest('.form-group');
                $group.addClass('has-error');
                $group.find('.help-block').html(error).removeClass('hidden');
            }
        });
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    saveDiscussion: function (ev) {
        ev.preventDefault();
        var that = this;
        var data = $('form#add-message').serializeObject();
        this.nDiscussion.set(data);
        if(this.model.isValid(true)) {
            this.nDiscussion.save(data, {
                beforeSend: this.router.sendAuthentication,
                wait: true,
                success: function (model, response) {
                    that.router.navigate('#projects/' + model["attributes"].project_id + '/discussions/' + model.id, {trigger: true});
                    that.undelegateEvents();
                }
            });
        }
    },

    updateOnEnter: function(e) {
        if(e.keyCode == 13) {
            this.saveDiscussion(e);
        }
    },

    initialize: function (options) {
        this.router = options.router;
        this.listenTo(this.model, 'change', this.render);
        this.nDiscussion = new Discussion();
    }
});
module.exports = NewDiscussion;