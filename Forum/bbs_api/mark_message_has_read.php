<?php

require_once 'base/base.php';
require_once 'base/account.php';
require_once 'base/message.php';

$account = is_login();

$messages = mark_all_message_has_read($account);
json_success("All unread message", $messages);