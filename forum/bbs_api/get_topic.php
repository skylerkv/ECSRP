<?php
// Get topic details
require_once 'base/base.php';
require_once 'base/account.php';
require_once 'base/topic.php';
require_once 'base/article.php';

// Topic name
$name = get("name");

$account = is_login_no_autostop();

$topic = find_topic($name);

if (is_null($topic)) {
    json_error("The topic may not exist");
}

if (isset($account)) {
    // Logged in, check to see if I follow this topic
    $followed = Topic::has_followed($account, $topic->id);

    $topic->followed = $followed;
}

// Get all articles under the topic, record the number of articles Get all articles under the topic, record the number of articles


$topic->articles = find_all_article($topic);
$topic->article_count = count($topic->articles);

json_success("Query complete", $topic);