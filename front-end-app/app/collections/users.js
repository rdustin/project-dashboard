/**
 * User Collection: to hold a collection of users
 * @author Randy Dustin <randydustin@gmail.com>
 */
var Backbone = require("Backbone");
var $ = require('jquery');

Backbone.$ = $;

var User = require('models/user');

var Users = Backbone.Collection.extend({

        model: User,
        url: 'https://project-dashboard.dev/api/users',

        selectById: function(id) {
            var user = this.get(id);
            if(user) {
                return user.id;
            } else {
                return false;
            }

        }

});
module.exports = Users;