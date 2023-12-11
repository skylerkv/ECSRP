<?php
// Get recommended topics
require_once 'base/base.php';
require_once 'base/account.php';
require_once 'base/topic.php';
require_once 'base/article.php';

$topic_list = find_all_topic();

$final_list = [];
if (count($topic_list) > 4) {
    # If there are more than 4 topics, pick 4 topics at random
    $final_list = array_rand_pick($topic_list, 4);
} else {
    // Take all
    $final_list = $topic_list;
}

json_success("Query complete", $final_list);

