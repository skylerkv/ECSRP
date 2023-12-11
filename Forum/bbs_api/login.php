<?php
require_once 'base/base.php';
require_once 'base/account.php';

if (is_login_no_autostop()) {
    return json_success("login success", null);
}

$email = post('email');
$password = post('password');

$success = login_account($email, $password);

if ($success) {
    json_success("login success", null);
} else {
    json_error("login fail");
}
