/**
 * Project Model: defines the default project parameters
 * and defines validation rules
 * @author Randy Dustin <randydustin@gmail.com>
 */
var Backbone = require("Backbone");
var _ = require('underscore');

var Project = Backbone.Model.extend({

    defaults: {
        name: "Unknown Project",
        status: "inactive",
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
        name: {
            required: true
        },
        userIds: {
            required: true
        }
    },

    url: function () {
        return 'https://project-dashboard.dev/api/projects';
    }
});
module.exports = Project;