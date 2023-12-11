<?php
// Get all unread messages
require_once 'base/base.php';
require_once 'base/account.php';
require_once 'base/message.php';

$account = is_login();

$messages = get_message_not_read($account);
json_success("All unread messages", $messages);