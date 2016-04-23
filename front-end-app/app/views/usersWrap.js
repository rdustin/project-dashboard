/**
 * View that provides container for the
 * user list area of the site
 * @author Randy Dustin <randydustin@gmail.com>
 */
var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
require('jquery.cookie');
var Handlebars = require('handlebars');
var Templates = require('templates/compiledTemplates')(Handlebars);

var UsersWrap = Backbone.View.extend({
    template: Templates['/usersWrap'],

    render: function() {
        var role = $.cookie('role');
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
        this.$el.html(this.template({administrator: access.administrator, client: access.client, developer: access.developer}));
        return this;
    }
});
module.exports = UsersWrap;