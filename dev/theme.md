# Theme

PHPNuxBill Support Themes Modification

PHPNuxBill using [Smarty](https://www.smarty.net/) for Interface.   
Themes saved at **ui/themes**

Folder name use underscore for space, example **ui/themes/my_theme** it will show as **My Theme**

User can Customize Theme or default Theme using **ui_custom**

The priority for the folder are

1. ui/ui_custom
2. ui/themes
3. ui/ui

You can create theme for Customer only, Admin Only, or both.   
But Customer only is recomended.

## Variable

**{$_theme}** is used for path   
example:   
```html
<link rel="stylesheet" href="{$_theme}/styles/bootstrap.min.css">
```
it will change to
```html
<link rel="stylesheet" href="ui/themes/my_theme/styles/bootstrap.min.css">
```

**{$_c}** are config variable, key values from table **tbl_appconfig**

## Theme Modification

if you just want to change some default theme, just copy the file to **ui/ui_custom**, then edit it
