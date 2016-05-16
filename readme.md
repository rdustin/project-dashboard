# A simple project dashboard for small web shops to use to communicate with clients and developers.
This was my systems project for my Master's degree.

## Introduction
This project has a long way to go before I would call it "production ready".
I currently view it primarily as a portfolio piece, but I would like to work
more on it in the future. It was my first jump into building a RESTful API as
well as a single page application.


## Getting Started
The project dashboard application has two major components:
1. The client interface (using Backbone.js)
2. The RESTful web service (using the Slim PHP framework)

You can run this entire application as-is using Vagrant (https://www.vagrantup.com/) by:
1. cloning the repository to your computer
2. open your terminal and navigate to the directory in which you cloned the project
3. type `vagrant up`

 Once vagrant has finished loading the project, you can open your browser and
 navigate to https://project-dashboard.dev.

 The following users have been created (use the email as the username to login):

 * testadmin@example.com
 * bob.client@example.com
 * george.developer@example.com
 * philbert.developer@example.com

 **NOTE:** All users have the password of abc123


## Contributing
You are welcome to contribute to the project dashboard.

The client interface can be built by navigating to the front-end-app
folder in your terminal and running `grunt` to compile and build.
The compiled code will be copied to `www/sites/project-dashboard` for use
by the vagrant instance.

For development you can type `grunt server`. This will create a basic node
http server at http://localhost:5000, will watch for changes to the code and
re-compile as needed.

**NOTE:** You will need node.js and grunt installed on your computer for this
to work. You will also need to mock up the api calls in some fashion.

### Data
Some sample data is included by default via the data/initial-db-data.sql file.
The data is imported during provisioning process when you vagrant up.
phpMyAdmin is also installed and available via the url: `http://192.168.30.120/phpmyadmin/`.

You can set usernames, database names, and passwords in the
`provisioning/ansible/playbooks/group_vars/dbservers` file included in the project.

The default mysql password for all users is abc123.
