/**
 * View that shows the navigation bar and determines which
 * menu items appear based on the authenticated user's role
 * @author Randy Dustin <randydustin@gmail.com>
 */
var Backbone = require('backbone');
var _ = require('underscore');
var $ = Backbone.$;
require('jquery.cookie');
var Handlebars = require('handlebars');
var Templates = require('templates/compiledTemplates')(Handlebars);

var LoginView = require('views/login');
var Session = require('models/session');

var NavbarView = Backbone.View.extend({
    template: Templates['/navbar'],

    initialize: function () {
        _.bindAll(this, 'render', 'login', 'logout');
        this.session = Session.getInstance();

        this.loginView = new LoginView();

        this.listenTo(this.session, 'login:success', this.render);
        this.listenTo(this.session, 'logout:success', this.render);
    },

    render: function () {
        var session = this.session.currentUser();
        var role = $.cookie('role');
        var user_id = $.cookie('id');
        var first_name = $.cookie('first_name');
        var access = {"administrator": false, "client": false, "developer": false}
        switch(role) {
            case "administrator":
                access.administrator = true;
                break;
            case "client":
                access.client = true;
                break;
            case "developer":
                access.developer = true;
                break;
        }
        this.$el.html(this.template({session: session, administrator: access.administrator, client: access.client, developer: access.developer, user_id: user_id, first_name: first_name}));
        if (session) {
            this.$el.delegate('.logout', 'click', this.logout);
        } else {
            this.$el.delegate('.login', 'click', this.login);
        }
        return this;
    },

    login: function (ev) {
        ev.preventDefault();
        $('body').append(this.loginView.render().el);
    },

    logout: function (ev) {
        ev.preventDefault();
        this.session.logout();
    }
});
module.exports = NavbarView;