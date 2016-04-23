/**
 * Discussion Model: defines the default discussion parameters
 * and defines validation rules
 * @author Randy Dustin <randydustin@gmail.com>
 */
var Backbone = require("Backbone");
var _ = require('underscore');
var backboneValidation = require('backbone-validation');

var Discussion = Backbone.Model.extend({

    defaults: {
        title: "",
        message: "",
        selected: false
    },

    validation: {
        title: {
            required: true
        },
        message: {
            required: true
        }
    },

    url: function () {
        return 'https://project-dashboard.dev/api/discussions';
    }
});
module.exports = Discussion;