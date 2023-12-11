<?php
// Delete the article
require_once 'base/base.php';
require_once 'base/account.php';
require_once 'base/topic.php';
require_once 'base/article.php';
require_once 'base/message.php';

// Article ID
$article_id = get("article_id");

$account = is_login();

// Find an article (both unpublished and published) based on the article ID
$article = find_article_by_id($article_id);
if (is_null($article)) {
    # Topic doesn't exist
    json_error(" Topic does not exist The article does not exist and cannot be deleted");
}

// Delete this article
$success = delete_article($article_id);
// The article has been deleted
if ($success) {
    

    // If the author account exists, a message is sent to the author of the article
    $author = find_account_by_uid($article->author_id);
    if (isset($author)) {
        # The author ID data of the article is wrong, the author cannot be found, it may be that the author has cancelled the account (although there is no function to cancel the account)
        send_message("article（" . $article->name . "）No, the administrator has deleted it", $author);
    }

    json_success("have deleted", null);
} else {
    json_error("fail to delete");
}