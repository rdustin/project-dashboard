/**
 * Project Collection: to hold a collection of project
 * @author Randy Dustin <randydustin@gmail.com>
 */
var Backbone = require("Backbone");
var $ = require('jquery');

Backbone.$ = $;

var Project = require('models/project');

var Projects = Backbone.Collection.extend({

        model: Project,
        url: 'https://project-dashboard.dev/api/projects',

        selectById: function(id) {
            var project = this.get(id);
            return project.id;
        }

});
module.exports = Projects;