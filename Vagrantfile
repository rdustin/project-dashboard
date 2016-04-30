# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
    # set which version of linux we want... must be a valid option from
    # https://vagrantcloud.com/discover/
    config.vm.box = "ubuntu/trusty32"

    # set the ip of the server
    config.vm.network "private_network", ip: "192.168.30.117"

    # if you want any local folders to be synced besides the default
    config.vm.synced_folder "www/sites", "/var/www/html"

    # adjust the amount of memory the server has access to
    #config.vm.provider "virtualbox" do |vb|
    #    vb.customize ["modifyvm", :id, "--memory", "1024"]
    #end

    # provision the server (Windows Host)
    # we use ansible for provisioning which isn't natively supported
    # on Windows hosts so we run a shell script to install ansible on
    # the server, copy our playbook over and run it from there.
    config.vm.provision :shell, :path => "provisioning/ansible-windows-only.sh"

    # provision the server (OSX/Linux)
    # To use this on an OSX or Linux host comment out the line above
    # that says: config.vm.provision :shell, :path => "provisioning/ansible-windows-only.sh"
    # and uncomment the three lines below this.
    # config.vm.provision "ansible" do |ansible|
    #   ansible.playbook = "provisioning/ansible/playbooks/playbook.yml"
    #   ansible.groups = {
    #       "webservers" => ["default"],
    #       "dbservers" => ["default"],
    #   }
    # end
end
