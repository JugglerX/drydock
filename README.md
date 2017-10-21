# Drydock Drupal 8 Base Theme

# Install with DrupalVM

## Local Prerequisites

* Install Composer Globally https://getcomposer.org/doc/00-intro.md#globally
* Install Vagrant https://www.vagrantup.com/downloads.html
* Install Virtual Box https://www.virtualbox.org/wiki/Downloads

## Install

Download this repo to your local machine. Extract the zip file and rename the folder to your project name.

```
cd my-project-name
cd vm
```

Modify the Drupal-VM config.yml file. Change the hostname and machine_name to your project name. You do not need to modify any other parts of the config.yml.

```
// vm/config.yml
vagrant_hostname: myprojectname.dev
vagrant_machine_name: myprojectname
vagrant_ip: 192.168.88.88
```

Deploy Drupal VM using Vagrant.

```
vagrant up
```

Drupal should be installed locally. Edit your /etc/hosts file to access the installation locally.

```
subl /etc/hosts
// add the line 
192.168.88.88 myprojectname.dev
```

Visit myprojectname.dev in the browser!

if you see the Apache start page instead of the Drupal website try:

```
vagrant halt
vagrant up
```

------------

Create a new Github repo on Github and then initalise a new Github repo in the /drupal folder.

```
cd drupal
git init
git add -A .
git commit -m "web and vendor directory from composer install"
git remote add origin https://github.com/JugglerX/your-github-repo.git
git push origin master
```

Create a Pantheon website. You can use the dashboard or create it from the CLI using Terminus.

```
terminus site:create my-project "My Project" "Drupal 8"
terminus connection:set my-project.dev git
```

Push the code to the Pantheon git repo.

```
// you can get the ssh url from the pantheon dashboard > connection info
git remote add pantheon ssh://ID@ID.drush.in:2222/~/repository.git
git push --force pantheon master
```

Upload the MySQL database to Pantheon

```
vagrant ssh
cd /var/www/drupalvm/drupal
mkdir sql
cd sql
mysqldump -uroot -proot drupal > drupal.sql;
exit
cd sql
mysql -u pantheon -p{random_password} 7 -h {pantheon_hostname} -P 27595 pantheon < drupal.sql
```

