<?php

require_once 'base.php';
require_once 'account.php';
require_once 'topic.php';
require_once 'comment.php';


function publish_article(Account $account, Topic $topic, string $name, string $content)
{

    $tx = begin_transaction();

    $sql = "INSERT INTO `article`( `published`,`author_id`, `topic_id`,`name`, `content`, `create_time`) VALUES (?,?,?,?,?,?)";


    $published = 0;

    tx_execute_sql($tx, $sql, [$published, $account->uid, $topic->id, $name, $content, time()]);

    $tx->commit();
}


function allow_publish_article(Article $article)
{

    $tx = begin_transaction();

    $sql = "UPDATE `article` SET `published`= 1 WHERE id = ?";

    tx_execute_sql($tx, $sql, [$article->id]);

    $tx->commit();
}



function find_all_article(Topic $topic): array
{

    $sql = "SELECT `id`, `author_id`,`name`, `topic_id`, `content`, `create_time` FROM `article` WHERE published = 1 and topic_id = ?";
    $result = fetch_all_sql($sql, [$topic->id]);

    if (array_is_not_empty($result)) {

        return array_map(function ($row) {
            $a = new Article($row);

            $a->comments = find_all_comment($a);
            return $a;
        }, $result);
    }

    return [];
}


function find_unpublished_article(string $article_id): Article|null
{

    $sql = "SELECT `id`, `author_id`,`name`, `topic_id`, `content`, `create_time` FROM `article` WHERE published = 0 and id = ?";
    $result = fetch_sql($sql, [$article_id]);

    if (array_is_not_empty($result)) {

        return new Article($result);
    }

    return null;
}


function find_all_article_unpublished(): array
{

    $sql = "SELECT article.`id`, `author_id`,`name`, `topic_id`, `content`, article.`create_time`,nickname author_name FROM `article` join account on account.id = article.author_id WHERE published = 0";
    $result = fetch_all_sql($sql, null);

    if (array_is_not_empty($result)) {
        return array_map(function ($row) {
            return new Article($row);
        }, $result);
    }

    return [];
}


function find_article(string $article_id): Article|null
{
    $sql = "SELECT `id`, `author_id`,`name`, `topic_id`, `content`, `create_time` FROM `article` WHERE published = 1 and id = ?";
    $result = fetch_sql($sql, [$article_id]);

    if (array_is_not_empty($result)) {

        return new Article($result);
    }

    return null;
}


function find_article_by_id(string $article_id): Article|null
{
    $sql = "SELECT `id`, `author_id`,`name`, `topic_id`, `content`, `create_time` FROM `article` WHERE id = ?";
    $result = fetch_sql($sql, [$article_id]);

    if (array_is_not_empty($result)) {

        return new Article($result);
    }

    return null;
}


function delete_article(int $article_id): bool
{
    $sql = "DELETE FROM `article` WHERE id = ?";
    return execute_sql($sql, [$article_id]);
}



final class Article
{

    public int $id;


    public int $author_id;


    public int $topic_id;


    public string $name;


    public string $content;


    public $create_time;


    public array $comments;


    public string $author_name;

    public function __construct($row)
    {
        $this->id = $row['id'];
        $this->name = $row['name'];
        $this->author_id = $row['author_id'];
        $this->topic_id = $row['topic_id'];
        $this->content = $row['content'];
        $this->create_time = $row['create_time'];
        if (isset($row['author_name'])) {
            $this->author_name = $row['author_name'];
        } 
    }
}