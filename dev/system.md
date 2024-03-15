# System Development

So you want to help me improve PHPNuxBill? 

PHPNuxBill use [Smarty](https://www.smarty.net/) for Template Engine and [iIdiorm](https://idiorm.readthedocs.io) for Database connections

This is the structure of PHPNuxBill

## Controllers

`system/controllers/` are the script who manage where the menu is going, if you see in the URL `_route=prepaid/list`, then the prepaid is the filename.

## Classess

`system/autoload/` is for static class who called dynamically, before creating some function, check is the function exists in the one of the script in there

## Cache

`system/cache/` where you put temporary data

## Uploads

`system/uploads/` so if you need to upload some images or file, put it in here

## Vendor

`system/vendor/` are where you install from php composer

## Language

`system/lan/` is for Language folder, now it use automatically translator, no need to improve

## UI Templates

`ui/ui/` is core template, this for you to modification

`ui/themes/` is for theme creator

`ui/ui_custom/` is for ui customizing by user

## Database

If you change database structure, edit sql file at install folder, and add it to `system/updates.json` by 
the date add the modification, so active user can update the structure.
