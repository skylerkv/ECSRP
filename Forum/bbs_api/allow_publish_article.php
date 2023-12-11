<?php

require_once 'base/base.php';
require_once 'base/account.php';
require_once 'base/topic.php';
require_once 'base/article.php';


$article_id = get("article_id");

$account = is_manager_login();

$article = find_unpublished_article($article_id);
if (isset($article)) {

    allow_publish_article($article);
    json_success("The article has been published", null);
} else {
    json_error("The article does not exist and cannot be published");
}
