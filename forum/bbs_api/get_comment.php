<?php
// Get all comments under the article
require_once 'base/base.php';
require_once 'base/account.php';
require_once 'base/topic.php';
require_once 'base/comment.php';

// Article ID
$article_id = get("article_id");

$article = find_article($article_id);
if (is_null($article)) {
    # Article does not exist
    json_error("The article does not exist and cannot be commented on");
}

// Find all reviews
$comment_list = find_all_comment($article);

json_success("Query complete", $comment_list);