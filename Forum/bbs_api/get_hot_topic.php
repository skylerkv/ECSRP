<?php
// Get hot topics
require_once 'base/base.php';
require_once 'base/account.php';
require_once 'base/topic.php';
require_once 'base/article.php';

$account = is_login_no_autostop();

$topic_list = find_all_hot_topic($account);

json_success("Query complete", $topic_list);

