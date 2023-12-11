<?php

require_once 'base/base.php';
require_once 'base/account.php';

$account = is_login();

$result = ['email' => $account->email];
json_success("login success", $result);