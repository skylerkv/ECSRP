<?php
// Get the latest comments
require_once 'base/base.php';
require_once 'base/account.php';
require_once 'base/topic.php';
require_once 'base/comment.php';


$account = is_login_no_autostop();

// Find all comments
$comment_list = find_latest_comment();

json_success("Query complete", $comment_list);