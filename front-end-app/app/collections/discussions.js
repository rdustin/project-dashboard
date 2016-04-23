/**
 * Discussion Collection: to hold a collection of discussions
 * @author Randy Dustin <randydustin@gmail.com>
 */
var Backbone = require("Backbone");
var $ = require('jquery');

Backbone.$ = $;

var Discussion = require('models/discussion');

var Discussions = Backbone.Collection.extend({

        model: Discussion,
        url: 'https://project-dashboard.dev/api/discussions',

        selectById: function(id) {
            var discussion = this.get(id);
            return discussion.id;
        }

});
module.exports = Discussions;