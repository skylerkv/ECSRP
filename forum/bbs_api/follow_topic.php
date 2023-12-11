<?php
// Follow a topic
require_once 'base/base.php';
require_once 'base/account.php';
require_once 'base/topic.php';


// ID of the topic you want to follow
$topic_id = get("topic_id");

$account = is_login();


if (Topic::has_followed($account, $topic_id)) {
    # If the topic is followed, cancel the topic
    $success = Topic::cancel_follow($account, $topic_id);
    if ($success) {
        json_success("Unfollow topic successfully", null);
    } else {
        json_error("Failed to unfollow the topic");
    }
} else {
    //Follow the topic
    $success = Topic::follow($account, $topic_id);
    if ($success) {
        json_success("Topic success", null);
    } else {
        json_error("Topic failure");
    }
}

