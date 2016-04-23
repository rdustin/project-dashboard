/**
 * Application router
 * @author Randy Dustin <randydustin@gmail.com>
 */
var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');
require('jquery.cookie');

/* Collection, Model, and View instantiations */
var Users = require('collections/users');
var users = new Users();

var Projects = require('collections/projects');
var projects = new Projects();

var User = require('models/user');
var Project = require('models/project');
var Discussion = require('models/discussion');
var PageError = require('models/pageError');

var Discussions = require('collections/discussions');
var discussions = new Discussions();

var Session = require('models/session');

var Navbar = require('views/navbar');
var UserDetails = require('views/userDetails');
var UserEdit = require('views/userEdit');
var HomeView = require('views/home');
var Login = require('views/login');
var UsersWrap = require('views/usersWrap');
var UsersList = require('views/usersList');
var UserProfile = require('views/userProfile');
var NewUser = require('views/newUser');
var ProjectsList = require('views/projectsList');
var ProjectsWrap = require('views/projectsWrap');
var ProjectEdit = require('views/projectEdit');
var ProjectPage = require('views/projectPage');
var DiscussionPage = require('views/discussionPage');
var NewDiscussion = require('views/newDiscussion');
var NewProject = require('views/newProject');
var ShowError = require('views/showError');


var PdRouter = Backbone.Router.extend({

    routes: {
        'users/:id/edit': 'editUser',
        'users/:id': 'showUser',
        'users': 'showUsers',
        'new/user': 'showNewUser',
        'profile/:id': 'showProfile',
        'projects/:id/new-discussion': 'showNewDiscussion',
        'projects/:id/discussions/:did': 'showDiscussion',
        'projects/:id/edit': 'editProject',
        'projects/:id': 'showProject',
        'new/project': 'showNewProject',
        'inactive/projects': 'showInactiveProjects',
        '': 'showMain'
    },

    sendAuthentication: function (xhr) {
        xhr.setRequestHeader('Authorization', $.cookie('auth_token'))
    },
    /* Users */
    editUser: function(id) {
        if(false === this._checkSession()) {
            return;
        }
        this.user = new User();
        this.deferred = this.user.fetch({
            beforeSend: this.sendAuthentication,
            url: 'https://project-dashboard.dev/api/users/' + id
        });
        var that = this;
        this.deferred.done(function(){
            if(this.currentUser) {
                this.currentUser.undelegateEvents();
            }
            this.currentUser = new UserEdit({model: that.user, router: that});
            this.currentUser.setElement(that.home.$('#content')).render();
            this.currentUser.render();
        })
        .fail(function (response) {
            that._handleFail(response);
        });
    },

    showUser: function(id) {
        if(false === this._checkSession()) {
            return;
        }
        this.user = new User();
        this.deferred = this.user.fetch({
            beforeSend: this.sendAuthentication,
            url: 'https://project-dashboard.dev/api/users/' + id
        });
        var that = this;
        this.deferred.done(function(){
            if(this.currentUser) {
                this.currentUser.undelegateEvents();
            }
            this.currentUser = new UserDetails({model: that.user, router: that});
            this.currentUser.setElement(that.home.$('#content')).render();
            this.currentUser.render();
        })
        .fail(function (response) {
            that._handleFail(response);
        });
    },

    showUsers: function() {
        if(false === this._checkSession()) {
            return;
        }
        this.deferred = users.fetch({beforeSend: this.sendAuthentication});
        this.users = users;
        this.userWrap = new UsersWrap();
        var that = this;
        this.deferred.done(function (results){
            that.users.reset(results);
            that.userWrap.setElement(that.home.$('#content')).render();
            if(this.userlist) {
                this.userlist.close();
            }
            this.userlist = new UsersList({
                el: '#users-wrap',
                collection: that.users,
                router: that
            });
            this.userlist.render();
        })
        .fail(function (response) {
            that._handleFail(response);
        });
    },

    showNewUser: function () {
        if(false === this._checkSession()) {
            return;
        }
        this.deferredProject = projects.fetch({beforeSend: this.sendAuthentication});
        this.projects = projects;
        var that = this;
        this.deferredProject.done(function() {
            if(this.newUserPage) {
                this.newUserPage.close();
            }
            this.newUserPage = new NewUser({model: new Backbone.Model(), router: that, projects: that.projects});
            this.newUserPage.setElement(that.home.$('#content')).render();
            this.newUserPage.render();
        })
        .fail(function (response) {
            that._handleFail(response);
        });

    },

    showProfile: function (id) {
        if(false === this._checkSession()) {
            return;
        }
        var that = this;
        this.user = new User();
        this.user.set('id', id);
        this.user.fetch({
            beforeSend: this.sendAuthentication,
            url: 'https://project-dashboard.dev/api/users/' + id,
            success: function (user) {
                this.userProfilePage = new UserProfile({model: that.user, router: that});
                this.userProfilePage.setElement(that.home.$('#content')).render();
                this.userProfilePage.render();
            },
            error: function (model, response) {
                that._handleFail(response);
            }
        });
    },

    /* Status code pages */
    notAuthorized: function () {
        this.errorDisplay = new ShowError({model: new PageError({statusCode: 403, message: "You are not authorized to view this content."})});
        this.errorDisplay.setElement(this.home.$('#content')).render();
        this.errorDisplay.render();
    },

    requestFailed: function () {
        this.errorDisplay = new ShowError({model: new PageError({statusCode: 400, message: "There was a problem with your request. Please try again."})});
        this.errorDisplay.setElement(this.home.$('#content')).render();
        this.errorDisplay.render();
    },

    notFound: function () {
        this.errorDisplay = new ShowError({model: new PageError({statusCode: 404, message: "The page you requested doesn't exist."})});
        this.errorDisplay.setElement(this.home.$('#content')).render();
        this.errorDisplay.render();
    },

    noContent: function () {
        this.errorDisplay = new ShowError({model: new PageError({statusCode: 204, message: "No records found."})});
        this.errorDisplay.setElement(this.home.$('#content')).render();
        this.errorDisplay.render();
    },

    resourceConflict: function () {
        this.errorDisplay = new ShowError({model: new PageError({statusCode: 409, message: "This item already exists."})});
        this.errorDisplay.setElement(this.home.$('#content')).render();
        this.errorDisplay.render();
    },

    resourceConflict: function () {
        this.errorDisplay = new ShowError({model: new PageError({statusCode: 500, message: "There was a server error."})});
        this.errorDisplay.setElement(this.home.$('#content')).render();
        this.errorDisplay.render();
    },

    _handleFail: function (response) {
        switch(response.status) {
            case 204:
                this.trigger('request:noContent');
                break;
            case 409:
                this.trigger('request:resourceConflict');
                break;
            case 404:
                this.trigger('request:notFound');
                break;
            case 403:
                this.trigger('request:denied');
                break;
            case 401:
                this.trigger('authorization:failed');
                break;
            case 400:
                this.trigger('request:failed');
                break;
            case 500:
                this.trigger('request:servererror')
        }
    },

    /* Discussions */
    showNewDiscussion: function (id) {
        if(false === this._checkSession()) {
            return;
        }
        var that = this;
        this.project = new Project();
        this.project.set('id', id);
        this.project.fetch({
            beforeSend: this.sendAuthentication,
            url: 'https://project-dashboard.dev/api/projects/' + id,
            success: function(project) {
                this.newDiscussionPage = new NewDiscussion({model: that.project, router: that});
                this.newDiscussionPage.setElement(that.home.$('#content')).render();
                this.newDiscussionPage.render();
            },
            error: function(model, response) {
                that._handleFail(response);
            }
        });
    },

    showDiscussion: function (id, did) {
        if(false === this._checkSession()) {
            return;
        }
        var that = this;
        this.discussion = new Discussion();
        this.discussion.set('id', did);
        this.discussion.fetch({
            beforeSend: this.sendAuthentication,
            url: 'https://project-dashboard.dev/api/discussions/' + id + '/' + did,
            success: function(discussion) {
                if(this.currentDiscussion) {
                    this.currentDiscussion.undelegateEvents();
                }
                this.currentDiscussion = new DiscussionPage({model: that.discussion, router: that});
                this.currentDiscussion.setElement(that.home.$('#content')).render();
                this.currentDiscussion.render();
            },
            error: function(model, response) {
                that._handleFail(response);
            }
        });
    },

    /* Projects */
    editProject: function(id) {
        if(false === this._checkSession()) {
            return;
        }
        this.project = new Project();
        this.project.set('id', id);
        this.deferredProject = this.project.fetch({
            beforeSend: this.sendAuthentication,
            url: 'https://project-dashboard.dev/api/projects/' + id
        });
        var that = this;
        this.deferredProject.done(function(){
            this.currentProject = new ProjectEdit({model: that.project, router: that});
            this.currentProject.setElement(that.home.$('#content')).render();
            this.currentProject.render();
        })
        .fail(function (response) {
            that._handleFail(response);
        });
    },

    showProject: function (id) {
        if(false === this._checkSession()) {
            return;
        }
        var that = this;
        this.project = new Project();
        this.project.set('id', id);
        this.project.fetch({
            beforeSend: this.sendAuthentication,
            url: 'https://project-dashboard.dev/api/projects/' + id,
            success: function(project) {
                this.projectPage = new ProjectPage({model: that.project, router: that});
                this.projectPage.setElement(that.home.$('#content')).render();
                this.projectPage.render();
            },
            error: function(model, response) {
                that._handleFail(response);
            }
        });
    },

    showNewProject: function () {
        if(false === this._checkSession()) {
            return;
        }
        this.deferred = users.fetch({beforeSend: this.sendAuthentication});
        this.users = users;
        var that = this;
        this.deferred.done(function() {
            this.newProjectPage = new NewProject({model: new Backbone.Model(), router: that, users: that.users});
            this.newProjectPage.setElement(that.home.$('#content')).render();
            this.newProjectPage.render();
        })
        .fail(function (response) {
            that._handleFail(response);
        });

    },

    showInactiveProjects: function () {
        if(false === this._checkSession()) {
            return;
        }
        this.deferredProject = projects.fetch({
            beforeSend: this.sendAuthentication,
            url: 'https://project-dashboard.dev/api/projects/inactive'
        });
        this.projects = projects;
        var that = this;
        this.projectWrap = new ProjectsWrap();
        this.deferredProject.done(function (results, statusText, xhr){
            if(xhr.status == 200) {
                that.projects.reset(results);
                that.projectWrap.setElement(that.home.$('#content')).render();
                if(this.projectlist) {
                    this.projectlist.close();
                }
                this.projectlist = new ProjectsList({
                    el: '#projects-wrap',
                    collection: that.projects,
                    router: this
                });
                this.projectlist.render();
            } else {
                that._handleFail(xhr);
            }
        })
        .fail(function (response) {
            that._handleFail(response);
        });
    },

    showMain: function () {
        if(false === this._checkSession()) {
            return;
        }
        this.deferredProject = projects.fetch({beforeSend: this.sendAuthentication});
        this.projects = projects;
        var that = this;
        this.projectWrap = new ProjectsWrap();
        this.deferredProject.done(function (results, statusText, xhr){
            if(xhr.status == 200) {
                that.projects.reset(results);
                that.projectWrap.setElement(that.home.$('#content')).render();
                if(this.projectlist) {
                    this.projectlist.close();
                }
                this.projectlist = new ProjectsList({
                    el: '#projects-wrap',
                    collection: that.projects,
                    router: this
                });
                this.projectlist.render();
            } else {
                that._handleFail(xhr);
            }
        })
        .fail(function (response) {
            that._handleFail(response);
        });
    },

    /* Authentication */
    onLogin: function () {
        this.session.reInit();
        var locationHashArray = window.location.hash.split("__");
        if(typeof locationHashArray[1] != 'undefined' && locationHashArray[1] != 'login' && locationHashArray[1] != 'logout') {
            var locationHash = '#' + locationHashArray[1];
        } else {
            var locationHash = '';
        }
        this.navigate(locationHash, {trigger: true});
    },

    logout: function () {
        var that = this;
        that.session.logout();
        that.session.reInit();
        that.navigate('#logout', true);
    },

    /**
     * checks to see if we have a valid session
     * if no sets up page with navbar and login page
     * including holding the original requested route
     * in the url hash for redirection
     * if yes removes the login page
     * @return {boolean} false if no session, true is session
     */
    _checkSession: function () {
        if(!this.session.currentUser()) {
            this.home = new HomeView({el: '#pd-app', router: this});
            this.home.render();
            this.navbar = new Navbar();
            this.navbar.setElement(this.home.$('#nav-bar')).render();
            this.login = new Login({router: this});
            this.login.setElement(this.home.$('#content')).render();
            $('#loading-indicator').hide();
            var locationHashArray = window.location.hash.split("#");
            if(typeof locationHashArray[1] != 'undefined' && locationHashArray[1] != 'login' && locationHashArray[1] != 'logout') {
                var locationHash = '__' + locationHashArray[1];
            } else {
                var locationHash = '';
            }

            this.navigate('#login' + locationHash, true);
            return false;
        } else {
            if(this.login) {
                this.login.setElement(this.home.$('#content .form-signin')).remove();
            }
            return true;
        }
    },

    /* Router initialization */
    initialize: function(options) {
        this.session = Session.getInstance();
        this.navbar = new Navbar();
        this.home = new HomeView({el: '#pd-app', router: this});
        this.home.render();
        this.navbar.setElement(this.home.$('#nav-bar')).render();
        this.listenTo(this.session, 'login:success', this.onLogin);
        this.listenTo(this.session, 'logout:success', this.logout);
        this.listenTo(this.session, 'logout:success', this.showMain);

        this.listenTo(this, 'request:resourceConflict', this.resourceConflict);
        this.listenTo(this, 'request:noContent', this.noContent);
        this.listenTo(this, 'request:denied', this.notAuthorized);
        this.listenTo(this, 'request:failed', this.requestFailed);
        this.listenTo(this, 'request:notFound', this.notFound);
        this.listenTo(this, 'request:servererror', this.serverError);
        this.listenTo(this.session, 'authorization:failed', this.showMain);
    }
});
module.exports = PdRouter;