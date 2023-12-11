<?php
// Get all articles under the topic
require_once 'base/base.php';
require_once 'base/account.php';
require_once 'base/topic.php';
require_once 'base/article.php';

// Topic name
$name = get("name");

$account = is_login();

// Obtain the topic object according to the topic name
$topic = find_topic($name);
if (is_null($topic)) {
    # Topic doesn't exist
    json_error("The topic does not exist, and the article under the topic cannot be obtained");
}

// Find all articles under the topic
$topic = find_all_article($topic);


json_success("Query complete", $topic);