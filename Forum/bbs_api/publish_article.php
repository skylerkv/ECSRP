<?php
require_once 'base/base.php';
require_once 'base/account.php';
require_once 'base/topic.php';
require_once 'base/article.php';

$topic_id = get("topic_id");


$article_name = get("article_name");


$article_content = get("article_content");

$account = is_login();

$topic = find_topic_id($topic_id);

if (is_null($topic)) {

    json_error("nothing");
}

publish_article($account, $topic, $article_name, $article_content);

json_success("published", null);