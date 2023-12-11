<?php
// 允许某个文章发布
require_once 'base/base.php';
require_once 'base/account.php';
require_once 'base/topic.php';
require_once 'base/article.php';

// 文章ID
$article_id = get("article_id");

$account = is_manager_login();

$article = find_unpublished_article($article_id);
if (isset($article)) {
    # 发布文章
    allow_publish_article($article);
    json_success("文章已发布", null);
} else {
    json_error("文章不存在，无法发布");
}