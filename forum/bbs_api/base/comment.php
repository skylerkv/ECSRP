<?php

require_once 'base.php';
require_once 'account.php';
require_once 'topic.php';
require_once 'article.php';


function publish_comment(Account $account, Article $article, string $content)
{
    $sql = "INSERT INTO `article_comment`(`article_id`, `user_id`, `comment`, `create_time`) VALUES (?,?,?,?)";
    execute_sql($sql, [$article->id, $account->uid, $content, time()]);
}



function find_all_comment(Article $article): array
{
    $sql = "SELECT nickname,article_comment.`id`, `article_id`, `user_id`, `comment`, article_comment.`create_time` FROM `article_comment` join account on account.id = article_comment.user_id where article_id = ?";
    $result = fetch_all_sql($sql, [$article->id]);

    if (array_is_not_empty($result)) {

        return array_map(function ($row) {
            return new Comment($row);
        }, $result);
    }

    return [];
}

function find_latest_comment(): array
{
    $sql = "SELECT nickname,article_comment.`id`, `article_id`, `user_id`, `comment`, article_comment.`create_time` FROM `article_comment` join account on account.id = article_comment.user_id order by create_time desc limit 0,6";
    $result = fetch_all_sql($sql, null);

    if (array_is_not_empty($result)) {
        return array_map(function ($row) {
            return new Comment($row);
        }, $result);
    }

    return [];
}


final class Comment
{

    public string $id;


    public string $article_id;


    public string $user_id;


    public string $comment;


    public string $create_time;



    public string $nickname;

    public function __construct(array $row)
    {
        $this->id = $row['id'];
        $this->article_id = $row['article_id'];
        $this->user_id = $row['user_id'];
        $this->comment = $row['comment'];
        $this->create_time = $row['create_time'];
        $this->nickname = $row['nickname'];
    }
}