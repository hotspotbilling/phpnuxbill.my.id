# Plugin Development

You can create Plugin or Payment Gateway for PHPNuxBill

## Naming convention 

all your function must be started with your file name, example `port_tester.php` so all function must be started with `port_tester`

- `port_tester_get_port()`
- `port_tester_check()`

So it will not conflict with other plugin

## Plugin

Plugin is used to modify system to add what you need. all plugin installed inside folder `system/plugin`

### Menu
To Integrate with menu just call this function

```php
**
 * Register for global menu
 * @param string name Name of the menu
 * @param bool admin true if for admin and false for customer
 * @param string function function to run after menu clicks
 * @param string position position of menu, use AFTER_ for root menu |
 * Admin/Sales menu: AFTER_DASHBOARD, CUSTOMERS, PREPAID, SERVICES, REPORTS, VOUCHER, AFTER_ORDER, NETWORK, SETTINGS, AFTER_PAYMENTGATEWAY
 * | Customer menu: AFTER_DASHBOARD, ORDER, HISTORY, ACCOUNTS
 * @param string icon from ion icon, ion-person, only for AFTER_
 * @param string label for showing label or number of notification or update
 * @param string color Label color
 * @param string auth authorization ['SuperAdmin', 'Admin', 'Report', 'Agent', 'Sales'] will only show in this user, empty array for all users
 */
function register_menu($name, $admin, $function, $position, $icon = '', $label = '', $color = 'success', $auth = []);

// Example
register_menu("Port Tester", true, "filename", 'SETTINGS', '');
```

then you need to create function with name `port_tester`

```php
function port_tester()
{
    global $ui;
    _admin();
    $ui->assign('_title', 'Port Tester');
    $ui->assign('_system_menu', 'settings');

    $port = _post('port', 8278);
    $ui->assign('port', $port);

    if (isset($_POST['port']) && !empty($_POST['port'])) {
        ini_set('default_socket_timeout', 10);
        $result = 'portquiz.net IP: <b>' . gethostbyname('portquiz.net') . "</b>\n";
        $result .= Http::getData('http://portquiz.net:' . $port, ['User-Agent: wget']);
        if (strpos($result, 'successful')) {
            $ui->assign('result', str_replace('Port test successful', "Testing Port <b>$port</b> test successful", $result));
        } else {
            $ui->assign('result', "Testing Port <b>$port</b> test Failed");
        }
    }

    $admin = Admin::_info();
    $ui->assign('_admin', $admin);
    $ui->display('port_tester.tpl');
}
```

for `.tpl` file, you need to put to folder `ui`

see the example in [port tester](https://github.com/hotspotbilling/plugin-test-port/blob/main/port_tester.php) plugin

To know where to put menu, see the [`header.tpl`](https://github.com/hotspotbilling/phpnuxbill/blob/6f5d49cd2fe982f58e8b3b504b97cf553269cad2/ui/ui/sections/header.tpl#L167) and [`user-header.tpl`](https://github.com/hotspotbilling/phpnuxbill/blob/6f5d49cd2fe982f58e8b3b504b97cf553269cad2/ui/ui/sections/user-header.tpl#L148)

there will be `{$_MENU_AFTER_CUSTOMERS}` then the position will be `AFTER_CUSTOMERS`

### Webhook

You can put your function code to run to some hook, example in [send_sms](https://github.com/hotspotbilling/phpnuxbill/blob/6f5d49cd2fe982f58e8b3b504b97cf553269cad2/system/autoload/Message.php#L25)

you want to run some code before sending sms, then add the hook to send_sms

```php
register_hook('send_sms', 'filename_my_function');

function filename_my_function(){

}
```

## Payment Gateway

To integrate with payment Gateway you just create the plugin, and installed inside folder `system/paymentgateway`, see [paypal for example](https://github.com/hotspotbilling/phpnuxbill-paypal/blob/main/paypal.php).

core function for payment Gateway are

```php
// Before create transaction, PHPNuxBill will 
function filename_validate_config()
{
    global $config;
    if (empty($config['filename_merchant_key'])) {
        Message::sendTelegram("filename payment gateway not configured");
        r2(U . 'order/package', 'w', Lang::T("Admin has not yet setup Duitku payment gateway, please tell admin"));
    }
}

// this to configure from admin
function filename_show_config()
{
    global $ui, $config;
    $ui->assign('_title', 'filename - Payment Gateway');
    $ui->display('filename.tpl');
}

function filename_save_config()
{
    // to save config must go to this function
}

function filename_create_transaction($trx, $user)
{
    global $config, $routes, $ui;
    // this will called when customer want to pay to create transaction
}

function filename_payment_notification()
{
    // this for getting webhook or notification from payment gateway
    // need to be exists even not configured
}

function filename_get_status($trx, $user)
{
    // this when customer want to check if payment success manually
}

```

