<?php
// Get all unpublished articles
require_once 'base/base.php';
require_once 'base/account.php';
require_once 'base/topic.php';
require_once 'base/article.php';

// Yes The administrator logs in
$account = is_manager_login();

// Find all unpublished articles
$article_list = find_all_article_unpublished();

json_success("Query complete", $article_list);