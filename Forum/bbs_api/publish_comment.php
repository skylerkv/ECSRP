<?php

require_once 'base/base.php';
require_once 'base/account.php';
require_once 'base/topic.php';
require_once 'base/comment.php';


$article_id = get("article_id");


$comment_content = get("comment_content");

$account = is_login();

$article = find_article($article_id);

if (is_null($article)) {

    json_error("nothing");
}

publish_comment($account, $article, $comment_content);

json_success("published", null);