# Old Install

# Drupal 8 / DrupalVM / Pantheon / Composer

### Local Prerequisites

* Install Composer Globally https://getcomposer.org/doc/00-intro.md#globally
* Install Vagrant https://www.vagrantup.com/downloads.html
* Install Virtual Box https://www.virtualbox.org/wiki/Downloads

### Use the Drupal 8 Pantheon Composer Repo
https://github.com/pantheon-systems/example-drops-8-composer

This repository can be used to setup a Drupal 8 site structure that has a composer directory structure and the Drupal site is installed inside of /web while the /vendor directory is outside.
## Create a Pantheon site

Create a new site using the pantheon dashboard or use terminus

```
terminus site:create my-project "My Project" "Drupal 8"
```

## New Drupal Install

### Install Drupal

By default if you create and install a new Drupal 8 site from the Pantheon dashboard, it will not use the composer install method and it will not create a folder structure of drupal/web/ 

```
mkdir my-project
cd my-project
terminus site:create my-project "My Project" "Drupal 8"
terminus connection:set my-project.dev git
composer create-project pantheon-systems/example-drops-8-composer drupal
cd drupal
composer prepare-for-pantheon
// copy the contents of this repo's drupal folder into your local drupal folder
// update the composer.json require {} with the packages you need.
composer update
git init
git add -A .
git commit -m "web and vendor directory from composer install"
// you can get the ssh url from the pantheon dashboard > connection info
git remote add pantheon ssh://ID@ID.drush.in:2222/~/repository.git
git push --force pantheon master
terminus drush my-project.dev -- site-install --site-name="My Drupal Site"
terminus dashboard:view my-project
cd web/sites/default/
wget https://raw.githubusercontent.com/JugglerX/drupal-vm-pantheon-config/master/drupal/web/sites/default/settings.local.php
// Now we can install Drupal VM
cd ..
git clone https://github.com/geerlingguy/drupal-vm.git
```

## Install Drupal VM

```
cd ..
// you should be in the my-project folder
git clone https://github.com/geerlingguy/drupal-vm.git vm
cd vm
```

Let's get ready to edit the Drupal VM config file. Copy _default.config.yml_ to _config.yml_ and open in your editor. 
You shoul
  - local_path: ./drupal
You are nearly ready to start Vagrant. 

Since we are not creating a new project with Drupal VM (we already downloaded the Drupal project files from the Pantheon repo) we need to adjust a few settings in the Drupal VM _default.config.yml_

Copy _default.config.yml_ to _config.yml_ and open in your editor. 
```
vagrant_synced_folders:
  # The first synced folder will be used for the default Drupal installation, if
  # any of the build_* settings are 'true'. By default the folder is set to
  # the drupal-vm folder.
  - local_path: ./drupal
build_composer_project: true
install_site: true

Now let's deploy Vagrant. From the project root /my-project

```
You should end up with a structure like so

```
/my-project
- /drupal
-- composer.json
-- /web
-- /vendor
- Vagrantfile
- default.config.yml
```

## Existing Install

If you have an existing composer project.

```
cd my-project
cd drupal
git remote add drops-8-composer https://github.com/pantheon-systems/example-drops-8-composer.git
git pull drops-8-composer master
// merge conflicts
  git checkout --theirs README.md
  git checkout --theirs LICENSE
  // copy the contents of this repo's drupal folder into your local drupal folder
  // update the composer.json require {} with the packages you need.
composer update
git add .
git commit -m "update to drops-8-composer structure"
git push --force pantheon master
```

## Drupal VM Vagrant

You are nearly ready to start Vagrant. 

Since we are not creating a new project with Drupal VM (we already downloaded the Drupal project files from the Pantheon repo) we need to adjust a few settings in the Drupal VM _default.config.yml_

Open _default.config.yml_ in your editor. 

* Set `build_composer_project: true` if it isn't already. 
* Set `install_site: false` 

Now let's deploy Vagrant. From the project root /my-project

```
vagrant up
```

Vagrant will take about 10 minutes to install. If the installation is successful you are ready to go.

Edit your etc/hosts file so you can access the the Drupal website in the browser using a hostname, instead of IP. You can find the IP at the top of the _default.config.yml_ file. 

```
subl /etc/hosts
// add the line 
192.168.88.88 mysite.dev
// restart terminal
```

View the website
http://mysite.dev

### Install Drupal Locally
http://mysite.dev/core/install.php

Install Drupal


### Export the local MySQL database

```
vagrant ssh
cd /var/www/drupalvm/drupal
mkdir sql
cd sql
mysqldump -uroot -proot drupal > drupal.sql;
ls
```

