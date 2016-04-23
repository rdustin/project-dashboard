/**
 * View that facilitates listing each project
 * @author Randy Dustin <randydustin@gmail.com>
 */
var Backbone = require('backbone');
var _ = require('underscore');
var ProjectView = require('views/project');
var ProjectsList = Backbone.View.extend({
    tagName: 'section',

    initialize: function() {
        this.projects = this.collection;
    },

    render: function() {
        var projectsView = this.collection.map(function(project) {
            return (new ProjectView({model: project})).render().el;
        });
        this.$el.html(projectsView);
        return this;
    }
});
module.exports = ProjectsList;