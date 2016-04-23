/**
 * View that provides display of a single discussion
 * and all comments associated with it. Also facilitates
 * adding new comments and file uploads
 * @author Randy Dustin <randydustin@gmail.com>
 */
var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
require('jquery.cookie');
var marked = require('marked');
var moment = require('moment');
var Handlebars = require('handlebars');
var Templates = require('templates/compiledTemplates')(Handlebars);
Handlebars.registerHelper('md', function(text) {
    return new Handlebars.SafeString(marked(text, {sanitize: true}));
});

Handlebars.registerPartial("markdownDescription", Templates['/markdownDescription']);

//Based from: https://gist.github.com/elidupuis/1468937 &
// http://stackoverflow.com/questions/18580495/format-a-date-from-inside-a-handlebars-template-in-meteor
var DateFormats = {
       dateOnly: "M/D/YYYY",
       dateTime: "M/D/YYYY h:mm a",
       long: "dddd DD.MM.YYYY HH:mm"
};
Handlebars.registerHelper("formatDate", function(datetime, format) {
  if (moment) {
    f = DateFormats[format];
    return moment(datetime).format(f);
  }
  else {
    return datetime;
  }
});

var Comment = require('models/comment');

var DiscussionPage = Backbone.View.extend({
    tagName: '#item-box',
    template: Templates['/discussionPage'],

    events: {
        'click #saveNewComment': 'saveComment',
        'keypress #saveNewComment': 'updateOnEnter',
        'click #uploadAttachment': 'saveAttachment'
    },

    render: function() {
        this.model.set('authenticated_user_name', $.cookie('first_name') + ' ' + $.cookie('last_name'))
        this.model.set('auth_token', $.cookie('auth_token'))
        Backbone.Validation.bind(this, {
            model: this.nComment,
            valid: function (view, attr) {
                var $group = $('form#add-comment [name="' + attr + '"]').closest('.form-group');
                $group.removeClass('has-error');
                $group.find('.help-block').html('').addClass('hidden');
            },
            invalid: function (view, attr, error) {
                var $group = $('form#add-comment [name="' + attr + '"]').closest('.form-group');
                $group.addClass('has-error');
                $group.find('.help-block').html(error).removeClass('hidden');
            }
        });
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    saveComment: function (ev) {
        ev.preventDefault();
        var that = this;
        var data = $('form#add-comment').serializeObject();
        this.nComment.set(data);
        if(this.model.isValid(true)) {
            this.nComment.save(data, {
                beforeSend: this.router.sendAuthentication,
                wait: true,
                success: function (model, response) {
                    var first_name = $.cookie('first_name');
                    var last_name = $.cookie('last_name');
                    $('.new-comment').before('<div class="row"> \
                        <div class="col-sm-1 discussee-box"> \
                            ' + first_name + ' ' + last_name + ' \
                        </div> \
                        <div class="col-sm-11 discussion-box"> \
                            ' + marked(model.escape("comment")) + ' \
                        <hr> \
                        </div> \
                    </div>');
                    $('form#add-comment textarea').val('');
                    that.nComment.clear();
                }
            });
        }
    },

    saveAttachment: function (ev) {
        ev.preventDefault();
        //see: http://stackoverflow.com/questions/5392344/sending-multipart-formdata-with-jquery-ajax
        var data = new FormData();
        $.each($('form#discussion-attachment-form #discussion_attachment')[0].files, function (i, file) {
            data.append('file-' + i, file);
        });
        $.ajax({
            type: 'POST',
            cache: false,
            contentType: false,
            processData: false,
            url: "https://project-dashboard.dev/api/files/" + $("form#discussion-attachment-form #project_id").val() + "/" + $("form#discussion-attachment-form #discussion_id").val(),
            data: data,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', $.cookie('auth_token')),
                $('form#discussion-attachment-form .help-block').text('');
            },
        })
        .done(function (data) {
            $('form#discussion-attachment-form').get(0).reset();
            $('ul.discussion-file-list').append('<li><a class="file-download" href="https://project-dashboard.dev/api/filedownload/' + data.id + '/' + $.cookie('auth_token') + '">' + data.name + '</a></li>');
        })
        .fail(function (response, status, xhr) {
            $('form#discussion-attachment-form .help-block').text('The attachment failed to upload. Please make sure it is in the allowed type.');
        });
    },

    updateOnEnter: function(e) {
        if(e.keyCode == 13) {
            this.saveComment(e);
        }
    },

    initialize: function (options) {
        this.router = options.router;
        this.listenTo(this.model, 'change', this.render);
        this.nComment = new Comment();
    }
});
module.exports = DiscussionPage;