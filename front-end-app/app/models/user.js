/**
 * User Model: defines the default user parameters
 * and defines validation rules
 * @author Randy Dustin <randydustin@gmail.com>
 */
var Backbone = require("Backbone");
var _ = require('underscore');

var User = Backbone.Model.extend({

    defaults: {
        first_name: "FirstName",
        last_name: "LastName",
        username: "username",
        email: "nobody@example.com",
        role: "guest",
        api_key: "",
        selected: false
    },

    //props: http://stackoverflow.com/questions/11522286/backbone-js-express-js-parameters-for-model-save/11522791#11522791
    save: function(attrs, options) {
        options || (options = {});

        options.contentType = 'application/json';
        options.data = JSON.stringify(attrs);

        Backbone.Model.prototype.save.call(this, attrs, options);
    },

    validation: {
        first_name: {
            required: true
        },
        last_name: {
            required: true
        },
        email: {
            pattern: 'email'
        },
        password2: {
            equalTo: 'password'
        },
        confirm_email: {
            equalTo: 'email'
        },
        role: {
            required: true
        }
    },

    url: function () {
        return 'https://project-dashboard.dev/api/users';
    }
});
module.exports = User;