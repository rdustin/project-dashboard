/**
 * View that provides the login form
 * @author Randy Dustin <randydustin@gmail.com>
 */
var Backbone = require('backbone');
var Handlebars = require('handlebars');
var Templates = require('templates/compiledTemplates')(Handlebars);
var _ = require('underscore');
var $ = require('jquery');

var Session = require('models/session');

var LoginView = Backbone.View.extend({
    template: Templates['/login'],

    events: {
        'submit': 'login'
    },

    render: function () {
        this.$el.html(this.template());
        this.$error = this.$el.find('.has-error .help-block');
        return this;
    },

    login: function (ev) {
        ev.preventDefault();
        var username = $('input[name=username]').val();
        var password = $('input[name=password]').val();

        var that = this;
        Session.getInstance().login(username, password);
    },

    renderError: function (err, options) {
        var errors = _.map(_.keys(err.validationError), function (key) {
            return err.validationError[key];
        })
        this.$error.text(errors);
    },

    initialize: function () {
        this.session = Session.getInstance();
        this.$error = this.$el.find('.error');
        this.listenTo(this.session, 'invalid', this.renderError);
        return this;
    }
});
module.exports = LoginView;