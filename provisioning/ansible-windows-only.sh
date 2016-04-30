#!/bin/bash
sudo -i
apt-get update

apt-get install python-software-properties
apt-get-repository ppa:rquillo/ansible
add-apt-repository ppa:rquillo/ansible
apt-get update
apt-get install -y ansible
cp /vagrant/provisioning/ansible/etc/ansible/hosts /etc/ansible
cd /vagrant/provisioning/ansible/playbooks
ansible-playbook playbook.yml