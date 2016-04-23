/**
 * Session Model: facilitates login and logout communication with api
 * sets and removes cookies
 * @author Randy Dustin <randydustin@gmail.com>
 */
var Backbone = require('backbone');
var User = require('models/user');
var $ = require('jquery');
var _ = require('underscore');
require('jquery.cookie');
var Session = Backbone.Model.extend({

    login: function (username, password) {
        var that = this;
        var credentials = JSON.stringify({email: username, password: password});
        $.ajax({type: 'POST', dataType: 'json',
            contentType: "application/json",
            url: "https://project-dashboard.dev/api/login",
            data: credentials
        })
        .done(function (data) {
            that.user = new User(data);
            $.cookie('auth_token', that.user.get('api_key'));
            $.cookie('role', that.user.get('role'));
            $.cookie('first_name', that.user.get('first_name'));
            $.cookie('last_name', that.user.get('last_name'));
            $.cookie('id', that.user.get('id'));

            that.trigger('login:success');
        })
        .fail(function (response) {
            that.trigger('invalid', that);
        });
    },

    currentUser: function () {
        var auth_token = $.cookie('auth_token');
        if(auth_token) {
            return true;
        } else {
            return false;
        }
    },

    logout: function () {
        var that = this;

        this.clear();
        $.ajax({type: 'POST', dataType: 'json',
            contentType: "application/json",
            url: "https://project-dashboard.dev/api/logout",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', $.cookie('auth_token'))
            }
        })
        .done(function (data) {
            $.cookie('auth_token', null);
            $.removeCookie('auth_token');
            $.cookie('role', null);
            $.removeCookie('role');
            $.cookie('first_name', null);
            $.removeCookie('first_name');
            $.cookie('last_name', null);
            $.removeCookie('last_name');
            $.cookie('id', null);
            $.removeCookie('id');

            that.trigger('logout:success');
        })
        .fail(function (response) {
        });
    },

    reInit: function () {
        this.session = new Session();
    }
});

var session;
Session.getInstance = function () {
    if(!session) {
        session = new Session();
    }

    return session;
}
module.exports = Session;