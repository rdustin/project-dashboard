/**
 * View that facilitates listing each user in the collection
 * @author Randy Dustin <randydustin@gmail.com>
 */
var Backbone = require('backbone');
var _ = require('underscore');
var UserView = require('views/user');
var UsersList = Backbone.View.extend({
    tagName: 'section',

    initialize: function() {
        this.users = this.collection;
    },

    render: function() {
        var usersView = this.collection.map(function(user) {
            return (new UserView({model: user})).render().el;
        });
        this.$el.html(usersView);
        return this;
    }
});
module.exports = UsersList;