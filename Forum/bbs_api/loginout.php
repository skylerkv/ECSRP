<?php
require_once 'base/base.php';
require_once 'base/account.php';

$account = is_login();

$account->login_out();

json_success("exit", null);
