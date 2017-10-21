Drydock Theme Install

### Download the Drydock Kickstart Project.

#### Composer Install


#### Deploy using SQL file.

Importing the SQL file is the fastest and most reliable way to kickstart your project. 

Deploy using Configuration Managment



copy the website over
update the configuration uuid

```
drush config-get "system.site" uuid
// 'system.site:uuid': 868c9f6e-9712-4083-bc6f-b1483449a4a8
```

Open the file in sites/default/config/system.site.yml and edit the uuid to the uuid output by drush.

Reload the admin configuration page in Drupal.

If you get the following error.

>The configuration cannot be imported because it failed validation for the following reasons:
Entities exist of type Shortcut link and Shortcut set Default. These entities need to be deleted before importing.

Edit `sites/default/config/shortcut.set.default.yml` and change the uuid to null `uuid: null`

# Enable The Theme

In 