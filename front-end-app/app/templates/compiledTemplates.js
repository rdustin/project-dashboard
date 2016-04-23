module.exports = function(Handlebars) {

var templates = {};

templates["/discussionPage"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n                                    <div class=\"row\">\n                                        <div class=\"col-sm-1 discussee-box\">\n                                            ";
  if (helper = helpers.user_name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.user_name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n                                        </div>\n                                        <div class=\"col-sm-11 discussion-box\">\n                                            "
    + escapeExpression((helper = helpers.md || (depth0 && depth0.md),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.comment), options) : helperMissing.call(depth0, "md", (depth0 && depth0.comment), options)))
    + "\n                                            <hr>\n                                        </div>\n                                    </div>\n                                    ";
  return buffer;
  }

function program3(depth0,data,depth1) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n                            <li><a class=\"file-download\" href=\"https://project-dashboard.dev/api/filedownload/";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "/"
    + escapeExpression(((stack1 = (depth1 && depth1.auth_token)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">";
  if (helper = helpers.original_name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.original_name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a> <span class=\"upload-date\">("
    + escapeExpression((helper = helpers.formatDate || (depth0 && depth0.formatDate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.upload_date), "dateTime", options) : helperMissing.call(depth0, "formatDate", (depth0 && depth0.upload_date), "dateTime", options)))
    + ")</span></li>\n                            ";
  return buffer;
  }

  buffer += "                <div class=\"row\">\n                    <div class=\"col-sm-12\">\n                        <h2><a href=\"/#projects/";
  if (helper = helpers.project_id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.project_id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.project_name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.project_name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a></h2>\n                    </div>\n                </div>\n                <!-- <div class=\"row\">\n                    <div class=\"col-sm-12\">\n                        <hr>\n                        <a href=\"/#projects/";
  if (helper = helpers.project_id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.project_id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "/discussions\">See all discussions</a>\n                        <hr>\n                    </div>\n                </div>\n                <br> -->\n                <div class=\"row\">\n                    <div class=\"col-sm-8\">\n                        <div class=\"row\">\n                            <div class=\"col-sm-12\">\n                                <h4>";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h4>\n                                <p>Posted by ";
  if (helper = helpers.user_name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.user_name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " on "
    + escapeExpression((helper = helpers.formatDate || (depth0 && depth0.formatDate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.creation_date), "dateOnly", options) : helperMissing.call(depth0, "formatDate", (depth0 && depth0.creation_date), "dateOnly", options)))
    + "</p>\n                            </div>\n                        </div>\n                        <br>\n                        <div class=\"row\">\n                            <div class=\"col-sm-12\">\n                                <div class=\"comment-box\">\n                                    <div class=\"row\">\n                                        <div class=\"col-sm-1 discussee-box\">\n                                            ";
  if (helper = helpers.user_name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.user_name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n                                        </div>\n                                        <div class=\"col-sm-11 discussion-box\">\n                                            "
    + escapeExpression((helper = helpers.md || (depth0 && depth0.md),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.message), options) : helperMissing.call(depth0, "md", (depth0 && depth0.message), options)))
    + "\n                                            <hr>\n                                        </div>\n                                    </div>\n                                    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.ownComment), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                    <div class=\"row new-comment\"></div>\n                                    <div class=\"row\">\n                                        <div class=\"col-sm-1 discussee-box\">\n                                            ";
  if (helper = helpers.authenticated_user_name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.authenticated_user_name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n                                        </div>\n                                        <div class=\"col-sm-11\">\n                                            <form id=\"add-comment\">\n                                                <div class=\"form-group\">\n                                                    <textarea class=\"form-control\" placeholder=\"Add a comment\" name=\"comment\"></textarea>\n                                                    <span class=\"help-block\"></span>\n                                                </div>\n                                                <div class=\"row\">\n                                                    <div class=\"col-sm-3\">\n                                                        <input type=\"hidden\" name=\"discussion_id\" value=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n                                                        <button class=\"btn btn-primary\" id=\"saveNewComment\" type=\"submit\">Add Comment</button>\n                                                    </div>\n                                                    <div class=\"col-sm-9\">\n                                                        ";
  stack1 = self.invokePartial(partials.markdownDescription, 'markdownDescription', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                                    </div>\n                                                </div>\n                                            </form>\n                                            <br>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"col-sm-4\">\n                        <h4>Files</h4>\n                        <form method=\"post\" enctype=\"multipart/form-data\" id=\"discussion-attachment-form\">\n                            <input type=\"hidden\" name=\"project_id\" id=\"project_id\" value=\"";
  if (helper = helpers.project_id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.project_id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n                            <input type=\"hidden\" name=\"discussion_id\" id=\"discussion_id\" value=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n                            <div class=\"form-group\">\n                                <input type=\"file\" name=\"discussion_attachment\" id=\"discussion_attachment\">\n                                <span class=\"help-block\"></span>\n                            </div>\n\n                            <button class=\"btn btn-primary\" id=\"uploadAttachment\" type=\"submit\">Upload File</button>\n                        </form>\n                        <ul class=\"discussion-file-list\">\n                            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.ownFile), {hash:{},inverse:self.noop,fn:self.programWithDepth(3, program3, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        </ul>\n                    </div>\n                </div>";
  return buffer;
  });

templates["/home"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"navbar navbar-inverse\" id=\"nav-bar\" role=\"navigation\"></div>\n<div id=\"message-box\"></div>\n<div id=\"content\" class=\"container-fluid\"></div>\n";
  });

templates["/login"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<form id=\"login\" class=\"form-signin\" role=\"form\">\n    <h2 class=\"form-signin-header\">Please sign in</h2>\n    <div class=\"form-group has-error\">\n        <span class=\"help-block\"></span>\n    </div>\n    <label for=\"username\">Username:</label>\n    <input type=\"text\" id=\"username\" name=\"username\" class=\"form-control\">\n\n    <label for=\"password\">Password:</label>\n    <input type=\"password\" id=\"password\" name=\"password\" class=\"form-control\">\n    <br />\n    <input type=\"submit\" class=\"btn btn-lg btn-primary btn-block\" value=\"Sign in\">\n</form>";
  });

templates["/markdownDescription"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<p>HTML tags are not allowed; however, we do support Markdown syntax.</p>\n<h3>Quick Reference:</h3>\n<div class=\"quick-reference\">\n    <p><strong>Paragraphs: </strong> Add a space after the sentence where the paragraph should end.</p>\n    <p><strong>Lists: </strong> <br>\n    <em>Unordered: </em> <br>* Item <br> *Item\n    <br>\n    <em>Ordered: </em><br> 1. Item<br> 2. Item</p>\n    <p><strong>Bold and Italics: </strong> <br>**Bold** <br> _Italic_</p>\n    <p><strong>Headings: </strong> <br># H1 <br> ## H2</p>\n    <p><strong>Code: </strong> ``` (three backticks)</p>\n    <p><strong>Links: </strong> [Link Text](www.google.com)</p>\n</div>\n<p><a href=\"https://help.github.com/articles/markdown-basics/\" target=\"_blank\">See this MarkDown cheet sheet for more information</a></p>";
  });

templates["/navbar"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n            <li ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.administrator), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "><a href=\"/\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.administrator), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">Projects";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.administrator), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a>\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.administrator), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </li>\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.administrator), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            <li><a href=\"#profile/";
  if (helper = helpers.user_id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.user_id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">Profile</a></li>\n            ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " class=\"dropdown\"";
  }

function program4(depth0,data) {
  
  
  return " class=\"dropdown-toggle\" data-toggle=\"dropdown\"";
  }

function program6(depth0,data) {
  
  
  return " <span class=\"caret\"></span>";
  }

function program8(depth0,data) {
  
  
  return "\n                <ul class=\"dropdown-menu\" role=\"menu\">\n                    <li><a href=\"/\">Active Projects</a></li>\n                    <li><a href=\"#new/project\">New Project</a></li>\n                    <li><a href=\"#inactive/projects\">Inactive Projects</a></li>\n                </ul>\n            ";
  }

function program10(depth0,data) {
  
  
  return "\n            <li><a href=\"#users\">Users</a></li>\n            ";
  }

function program12(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n        <ul class=\"nav navbar-nav navbar-right\">\n            <li class=\"dropdown\">\n                <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">Logged in as: ";
  if (helper = helpers.first_name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.first_name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " <span class=\"caret\"></span></a>\n                <ul class=\"dropdown-menu\" role=\"menu\">\n                    <li><a href=\"#logout\" class=\"logout session-management\">Logout</a></li>\n              </ul>\n            </li>\n        </ul>\n        ";
  return buffer;
  }

  buffer += "    <div class=\"navbar-header\">\n        <a href=\"/\" class=\"navbar-brand\">[Company Logo Here]</a>\n    </div>\n    <div class=\"navbar-collapse collapse\">\n        <ul class=\"nav navbar-nav\">\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.session), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </ul>\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.session), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n";
  return buffer;
  });

templates["/newDiscussion"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;


  buffer += " <div class=\"row\">\n    <div class=\"col-sm-12\">\n        <h2><a href=\"/#projects/";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a></h2>\n    </div>\n</div>\n<br>\n<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <form id=\"add-message\" method=\"post\">\n            <div class=\"form-group\">\n                <input type=\"text\" class=\"form-control\" name=\"title\" placeholder=\"Type the subject of the message\">\n                <span class=\"help-block\"></span>\n            </div>\n            <div class=\"form-group\">\n                <textarea class=\"form-control\" placeholder=\"Type message here\" name=\"message\"></textarea>\n                <span class=\"help-block\"></span>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-sm-2\">\n                    <input type=\"hidden\" name=\"project_id\" id=\"project_id\" value=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n                    <a class=\"btn btn-primary\" id=\"saveNewDiscussion\">Add Message</a>\n                </div>\n                <div class=\"col-sm-10\">\n                    ";
  stack1 = self.invokePartial(partials.markdownDescription, 'markdownDescription', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </div>\n            </div>\n        </form>\n        <br>\n    </div>\n</div>";
  return buffer;
  });

templates["/newProject"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n            <div class=\"checkbox\"><label for=\"user_";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"><input type=\"checkbox\" id=\"user_";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" name=\"userIds\" value=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isLoggedIn), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "> ";
  if (helper = helpers.first_name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.first_name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " ";
  if (helper = helpers.last_name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.last_name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</label></div>\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isLoggedIn), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " checked disabled";
  }

function program4(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += " <input type=\"hidden\" name=\"userIds\" value=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  return buffer;
  }

  buffer += "<div class=\"row\">\n    <br>\n    <div class=\"col-sm-12\">\n        <form id=\"add-project\">\n        <div class=\"form-group\">\n            <input type=\"text\" class=\"form-control\" name=\"name\" placeholder=\"Type the project name\">\n            <span class=\"help-block\"></span>\n        </div>\n        <div class=\"form-group\">\n            <label>Choose who has access to this project</label>\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.users), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            <span class=\"help-box\"></span>\n        </div>\n        <div class=\"form-group\">\n            <input type=\"hidden\" name=\"status\" value=\"active\">\n            <span class=\"help-box\"></span>\n        </div>\n        <button class=\"btn btn-primary\" id=\"saveNewProject\" type=\"submit\">Create Project</button>\n        </form>\n        <br>\n    </div>\n</div>";
  return buffer;
  });

templates["/newUser"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                    <div class=\"checkbox\"><label for=\"project_";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"><input type=\"checkbox\" id=\"project_";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" name=\"projectIds\" value=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"> ";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</label></div>\n                    ";
  return buffer;
  }

  buffer += "<div class=\"row\">\n<br>\n<div class=\"col-sm-12\">\n    <form id=\"add-user\">\n        <div class=\"row\">\n            <div class=\"col-sm-6\">\n                <div class=\"form-group\">\n                    <label for=\"first_name\">First Name:</label>\n                    <input type=\"text\" value=\"\" name=\"first_name\">\n                    <span class=\"help-block\"></span>\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"last_name\">Last Name:</label>\n                    <input type=\"text\" value=\"\" name=\"last_name\">\n                    <span class=\"help-block\"></span>\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"email\">Email/Username:</label>\n                    <input type=\"text\" value=\"\" name=\"email\">\n                    <span class=\"help-block\"></span>\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"confirm_email\">Confirm Email/Username:</label>\n                    <input type=\"text\" value=\"\" name=\"confirm_email\">\n                    <span class=\"help-block\"></span>\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"role\">Choose user's role:</label>\n                    <select name=\"role\" id=\"role\" class=\"form-control\">\n                        <option value=\"client\">Client</option>\n                        <option value=\"developer\">Developer</option>\n                        <option value=\"administrator\">Administrator</option>\n                    </select>\n                    <span class=\"help-block\"></span>\n                </div>\n\n            </div>\n            <div class=\"col-sm-6\">\n                <div class=\"form-group\">\n                    <label>Choose which projects this user should be able to access</label>\n                    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.projects), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    <span class=\"help-box\"></span>\n                </div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-sm-12\">\n                <button class=\"btn btn-primary\" id=\"saveNewUser\" type=\"submit\">Create User</button> <a class=\"cancel-link\" href=\"#users\">Cancel</a>\n            </div>\n        </div>\n        <br>\n    </div>\n</form>\n</div>";
  return buffer;
  });

templates["/project"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<div class=\"col-sm-3\">\n    <div class=\"panel panel-default\">\n        <div class=\"panel-heading\">\n            <h3 class=\"panel-title\"><a href=\"/#projects/";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a></h3>\n        </div>\n        <div class=\"panel-body\">\n            <p>Updated: "
    + escapeExpression((helper = helpers.formatDate || (depth0 && depth0.formatDate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.modified_date), "dateOnly", options) : helperMissing.call(depth0, "formatDate", (depth0 && depth0.modified_date), "dateOnly", options)))
    + "</p>\n        </div>\n    </div>\n</div>\n";
  return buffer;
  });

templates["/projectEdit"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <div class=\"form-group\">\n            <label>Choose who has access to this project</label>\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.allUsers), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            <span class=\"help-box\"></span>\n        </div>\n        <div class=\"form-group\">\n            <label for=\"status\">Status</label>\n            <select name=\"status\" id=\"status\">\n                <option value=\"active\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isActive), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">Active</option>\n                <option value=\"inactive\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isActive), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">Inactive</option>\n            </select>\n            <span class=\"help-box\"></span>\n        </div>\n        ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n            <div class=\"checkbox\"><label for=\"user_";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"><input type=\"checkbox\" id=\"user_";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" name=\"userIds\" value=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isUsers), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isLoggedIn), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "> ";
  if (helper = helpers.first_name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.first_name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " ";
  if (helper = helpers.last_name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.last_name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</label></div>\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isLoggedIn), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return "checked";
  }

function program5(depth0,data) {
  
  
  return " checked disabled";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += " <input type=\"hidden\" name=\"userIds\" value=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  return buffer;
  }

function program9(depth0,data) {
  
  
  return "selected";
  }

function program11(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n        <div class=\"form-group\">\n            <label>Who has access to this project</label>\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.allUsers), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            <span class=\"help-box\"></span>\n        </div>\n        <div class=\"form-group\">\n            <input type=\"hidden\" name=\"status\" value=\"";
  if (helper = helpers.status) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.status); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n            <span class=\"help-box\"></span>\n        </div>\n        ";
  return buffer;
  }
function program12(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isUsers), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  return buffer;
  }
function program13(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n            <div class=\"checkbox\"><label for=\"user_";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"> ";
  if (helper = helpers.first_name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.first_name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " ";
  if (helper = helpers.last_name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.last_name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</label></div>\n            <input type=\"hidden\" name=\"userIds\" value=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n            ";
  return buffer;
  }

  buffer += "<div class=\"row\">\n    <br>\n    <div class=\"col-sm-12\">\n        <form id=\"edit-project-form\">\n        <div class=\"form-group\">\n            <input type=\"text\" class=\"form-control\" name=\"name\" value=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" placeholder=\"Type the project name\">\n            <span class=\"help-block\"></span>\n        </div>\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.administrator), {hash:{},inverse:self.program(11, program11, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <button class=\"btn btn-primary\" id=\"update-project\" type=\"submit\">Update Project</button>\n        </form>\n        <br>\n    </div>\n</div>";
  return buffer;
  });

templates["/projectPage"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n    <br>\n        <a class=\"btn btn-default edit-project-link edit-link\" href=\"#projects/";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "/edit\">Edit Project</a>\n    ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n                <tr>\n                    <td>";
  if (helper = helpers.user_name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.user_name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n                    <td><a href=\"/#projects/";
  if (helper = helpers.project_id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.project_id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "/discussions/";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a></td>\n                    <td>"
    + escapeExpression((helper = helpers.formatDate || (depth0 && depth0.formatDate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.modified_date), "dateTime", options) : helperMissing.call(depth0, "formatDate", (depth0 && depth0.modified_date), "dateTime", options)))
    + "</td>\n                </tr>\n            ";
  return buffer;
  }

  buffer += "<div class=\"row\">\n    <div class=\"col-sm-10\">\n        <h2>";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h2>\n        <p>Status: (";
  if (helper = helpers.status) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.status); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ")</p>\n    </div>\n    <div class=\"col-sm-2\">\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.administrator), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n</div>\n <br>\n<div class=\"row\">\n    <div class=\"col-sm-4\">\n        <h4>Discussions <span class=\"badge\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.ownDiscussion)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></h4>\n    </div>\n    <div class=\"col-sm-8\">\n        <a class=\"btn btn-default new-discussion\" href=\"/#projects/";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "/new-discussion\">Start a new discussion</a>\n    </div>\n</div>\n<br>\n<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <table class=\"table\">\n            <tbody>\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.ownDiscussion), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </tbody>\n        </table>\n    </div>\n</div>";
  return buffer;
  });

templates["/projectsWrap"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  
  return "\n        <a class=\"btn btn-lg btn-default btn-new\" href=\"#new/project\"><span class=\"glyphicon glyphicon-plus\"></span></a>\n        <hr>\n        <a class=\"\" href=\"#inactive/projects\">Inactive Projects</a>\n    ";
  }

  buffer += "<div class=\"row\">\n    <div class=\"col-sm-1\">\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.administrator), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n    <div class=\"col col-sm-11\">\n        <div class=\"row\" id=\"projects-wrap\"></div>\n    </div>\n</div>";
  return buffer;
  });

templates["/showError"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"row error-wrap\">\n<br>\n<div class=\"col-sm-3\">\n    <div class=\"glyphicon glyphicon-exclamation-sign\"></div>\n    </div>\n<div class=\"col-sm-6\">\n    <div class=\"error-box\">\n        <h3>";
  if (helper = helpers.message) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.message); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h3>\n    </div>\n</div>\n<div class=\"col-sm-3\">\n    <div class=\"glyphicon glyphicon-exclamation-sign\"></div>\n</div>";
  return buffer;
  });

templates["/user"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<div class=\"col-sm-3\">\n    <div class=\"panel panel-default\">\n        <div class=\"panel-heading\">\n            <h3 class=\"panel-title\"><a href=\"/#users/";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.first_name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.first_name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " ";
  if (helper = helpers.last_name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.last_name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a></h3>\n        </div>\n        <div class=\"panel-body\">\n            <p>Updated: "
    + escapeExpression((helper = helpers.formatDate || (depth0 && depth0.formatDate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.modified_date), "dateOnly", options) : helperMissing.call(depth0, "formatDate", (depth0 && depth0.modified_date), "dateOnly", options)))
    + "</p>\n        </div>\n    </div>\n</div>";
  return buffer;
  });

templates["/userDetails"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                    <li class=\"list-group-item project_";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"><a href=\"/#projects/";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a></li>\n                ";
  return buffer;
  }

  buffer += "    <div class=\"row editable\">\n    <br>\n    <div class=\"col-sm-10\">\n        <div class=\"row\">\n            <div class=\"col-sm-6\">\n                <h2>";
  if (helper = helpers.first_name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.first_name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " ";
  if (helper = helpers.last_name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.last_name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h2>\n                <p><strong>Email/Username: </strong>";
  if (helper = helpers.email) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.email); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</p>\n                <p><strong>Role: </strong>";
  if (helper = helpers.role) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.role); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</p>\n            </div>\n            <div class=\"col-sm-6\">\n                <h3>";
  if (helper = helpers.first_name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.first_name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "'s Projects</h3>\n                <ul class=\"list-group\">\n                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.sharedProject), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </ul>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"col-sm-2\">\n        <a href=\"#users/";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "/edit\" class=\"btn btn-default edit-user-link edit-link\">Edit User</a>\n    </div>\n</div>";
  return buffer;
  });

templates["/userEdit"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                    <h3>";
  if (helper = helpers.first_name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.first_name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "'s Projects</h3>\n                    <ul class=\"list-group\">\n                    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.sharedProject), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    </ul>\n                    ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                        <li class=\"list-group-item project_";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"><a href=\"/#projects/";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a></li>\n                    ";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                    <div class=\"form-group\">\n                    <label>Revoke or add project access for ";
  if (helper = helpers.first_name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.first_name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</label>\n                    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.allProjects), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    </div>\n                    ";
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                        <div class=\"checkbox\">\n                            <label for=\"project_";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n                            <input type=\"checkbox\" id=\"project_";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" name=\"projectIds\" value=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isUsers), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</label>\n                        </div>\n                        <span class=\"help-box\"></span>\n                    ";
  return buffer;
  }
function program6(depth0,data) {
  
  
  return "checked";
  }

  buffer += "    <div class=\"row\">\n    <br>\n    <div class=\"col-sm-12\">\n        <div class=\"row\">\n            <form id=\"edit-user-form\">\n                <div class=\"col-sm-6\">\n                    <div class=\"form-group\">\n                        <label for=\"first_name\">First Name:</label>\n                        <input type=\"text\" name=\"first_name\" value=\"";
  if (helper = helpers.first_name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.first_name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n                        <span class=\"help-block\"></span>\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"last_name\">Last Name:</label>\n                        <input type=\"text\" name=\"last_name\" value=\"";
  if (helper = helpers.last_name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.last_name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n                        <span class=\"help-block\"></span>\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"email\">Email/Username:</label>\n                        <input type=\"text\" name=\"email\" value=\"";
  if (helper = helpers.email) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.email); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n                        <span class=\"help-block\"></span>\n                    </div>\n                    <div class=\"form-group\">\n                    <label for=\"confirm_email\">Confirm Email/Username:</label>\n                    <input type=\"text\" value=\"";
  if (helper = helpers.email) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.email); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" name=\"confirm_email\">\n                    <span class=\"help-block\"></span>\n                </div>\n                </div>\n                <div class=\"col-sm-6\">\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.administrator), {hash:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    <input type=\"hidden\" name=\"id\" value=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n                    <button class=\"btn btn-primary\" id=\"update-user\" type=\"submit\">Update User</button> <a href=\"#users/";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" class=\"cancel-link\">Cancel</a>\n                </div>\n\n            </form>\n        </div>\n        <br>\n        <br>\n    </div>\n</div>";
  return buffer;
  });

templates["/userProfile"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"row editable\">\n    <br>\n    <div class=\"col-sm-10\">\n        <div class=\"display-wrap\">\n            <h2>";
  if (helper = helpers.first_name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.first_name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " ";
  if (helper = helpers.last_name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.last_name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h2>\n            <p><strong>Email/Username: </strong>";
  if (helper = helpers.email) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.email); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</p>\n        </div>\n        <form id=\"edit-profile-form\">\n            <div class=\"form-group\">\n                <label for=\"first_name\">First Name:</label>\n                <input type=\"text\" name=\"first_name\" value=\"";
  if (helper = helpers.first_name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.first_name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n                <span class=\"help-block\"></span>\n            </div>\n            <div class=\"form-group\">\n                <label for=\"last_name\">Last Name:</label>\n                <input type=\"text\" name=\"last_name\" value=\"";
  if (helper = helpers.last_name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.last_name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n                <span class=\"help-block\"></span>\n            </div>\n            <div class=\"form-group\">\n                <label for=\"email\">Email/Username:</label>\n                <input type=\"text\" name=\"email\" value=\"";
  if (helper = helpers.email) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.email); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n                <span class=\"help-block\"></span>\n            </div>\n            <div class=\"form-group\">\n                <label for=\"confirm_email\">Email/Username:</label>\n                <input type=\"text\" name=\"confirm_email\" value=\"";
  if (helper = helpers.email) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.email); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n                <span class=\"help-block\"></span>\n            </div>\n            <div class=\"form-group\">\n                <label for=\"password\">Password:</label>\n                <input type=\"password\" name=\"password\" value=\"";
  if (helper = helpers.password) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.password); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n                <span class=\"help-block\"></span>\n            </div>\n            <div class=\"form-group\">\n                <label for=\"password2\">Confirm Password:</label>\n                <input type=\"password\" name=\"password2\" value=\"";
  if (helper = helpers.password2) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.password2); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n                <span class=\"help-block\"></span>\n            </div>\n            <input type=\"hidden\" name=\"id\" value=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n            <button class=\"btn btn-primary update-profile\" type=\"submit\">Update Profile</button>\n        </form>\n        <br>\n        <br>\n    </div>\n    <div class=\"col-sm-2\">\n        <a href=\"#\" class=\"btn btn-default edit-profile-link edit-link\">Edit Profile</a>\n    </div>\n</div>";
  return buffer;
  });

templates["/usersWrap"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  
  return "\n        <a class=\"btn btn-lg btn-default btn-new\" href=\"#new/user\"><span class=\"glyphicon glyphicon-plus\"></span></a>\n    ";
  }

  buffer += "<div class=\"row\">\n    <br>\n    <div class=\"col-sm-1\">\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.administrator), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n    <div class=\"col col-sm-11\">\n        <div class=\"row\" id=\"users-wrap\"></div>\n    </div>\n</div>";
  return buffer;
  });

return templates;

};