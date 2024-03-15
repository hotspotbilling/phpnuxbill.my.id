# Plugin Development

You can create Plugin or Payment Gateway for PHPNuxBill

## Plugin

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
register_menu("Port Tester", true, "port_tester", 'SETTINGS', '');
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
