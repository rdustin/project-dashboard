/**
 * Comment Model: defines the default comment parameters
 * and defines validation rules
 * @author Randy Dustin <randydustin@gmail.com>
 */
var Backbone = require("Backbone");
var _ = require('underscore');
var backboneValidation = require('backbone-validation');

var Comment = Backbone.Model.extend({

    defaults: {
        comment: "",
        selected: false
    },

    validation: {
        comment: {
            required: true
        }
    },

    url: function () {
        return 'https://project-dashboard.dev/api/comments';
    }
});
module.exports = Comment;