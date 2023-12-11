<?php
// Get all topics
require_once 'base/base.php';
require_once 'base/account.php';
require_once 'base/topic.php';
require_once 'base/article.php';

$account = is_login_no_autostop();

$topic_list = find_all_topic();

foreach ($topic_list as $topic) {
    if (isset($account)) {
        // You are logged in to check if I follow this topic
        $followed = Topic::has_followed($account, $topic->id);
        $topic->followed = $followed;
    }

    // Get all articles under the topic and record the number of articles
    $topic->articles = find_all_article($topic);
    $topic->article_count = count($topic->articles);
}

json_success("Query complete", $topic_list);