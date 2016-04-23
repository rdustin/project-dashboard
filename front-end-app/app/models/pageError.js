/**
 * Error Page Model: defines the default error page parameters
 * @author Randy Dustin <randydustin@gmail.com>
 */
var Backbone = require("Backbone");
var _ = require('underscore');

var PageError = Backbone.Model.extend({

    defaults: {
        statusCode: "000",
        message: "An unknown error has occured. Please try again.",
    },
});
module.exports = PageError;