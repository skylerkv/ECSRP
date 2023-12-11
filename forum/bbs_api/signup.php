<?php

require_once 'base/base.php';
require_once 'base/account.php';

$email = post_or_get(['username', 'email']);    
$password = post('password');                   

$create_success = create_account($email, $password);

if ($create_success) {

    login_account($email, $password);
    json_success("success", null);
} else {
    json_error("faliure");
}