<?php

require_once 'base.php';

function create_topic(string $type, string $name, string $desp, string $image_filename)
{
    if (find_topic($name)) {

        json_error("error");
    }

    $tx = begin_transaction();

    $sql = "INSERT INTO `topic`(`type`, `name`, `desp`,`image`,`followers`, `article_count`, `create_time`, `update_time`) VALUES (?,?,?,?,?,?,?,?)";


    $article_count = 0;


    $followers = 0;

    $now = time();


    $create_time = $now;


    $update_time = $now;

    tx_execute_sql($tx, $sql, [$type, $name, $desp, $image_filename, $followers, $article_count, $create_time, $update_time]);

    $tx->commit();
}


function find_topic(string $name): Topic|null
{
    $sql = "SELECT `type`,`id`, `name`, `desp`,`image`,`followers`, `article_count`, `create_time`, `update_time` FROM `topic` WHERE name =?";

    $result = fetch_sql($sql, [$name]);

    if (array_is_not_empty($result)) {

        return new Topic($result);
    }

    return null;
}


function find_all_topic(): array
{
    $sql = "SELECT `type`,`id`, `name`, `desp`,`image`,`followers`, `article_count`, `create_time`, `update_time` FROM `topic`";

    $result = fetch_all_sql($sql, null);

    if (array_is_not_empty($result)) {

        return array_map(function ($row) {
            $topic = new Topic($row);
            $topic->articles = find_all_article($topic);
            $topic->article_count = count($topic->articles);
            return $topic;
        }, $result);
    }

    return [];
}


function find_all_hot_topic(Account|null $account): array
{
    $sql = "SELECT `type`,`id`, `name`, `desp`,`image`,`followers`, `article_count`, `create_time`, `update_time` FROM `topic` order by followers desc limit 0,6";

    $result = fetch_all_sql($sql, null);

    if (array_is_not_empty($result)) {

        return array_map(function ($row) use ($account) {
            $topic = new Topic($row);

            if (isset($account)) {

                $followed = Topic::has_followed($account, $topic->id);
                $topic->followed = $followed;
            }


            $topic->articles = find_all_article($topic);
            $topic->article_count = count($topic->articles);

            return $topic;
        }, $result);
    }

    return [];
}


function find_topic_id(string $id): Topic|null
{
    $sql = "SELECT `type`,`id`, `name`, `desp`,`image`,`followers`, `article_count`, `create_time`, `update_time` FROM `topic` WHERE id =?";

    $result = fetch_sql($sql, [$id]);

    if (array_is_not_empty($result)) {

        $topic = new Topic($result);

        $topic->articles = find_all_article($topic);
        $topic->article_count = count($topic->articles);
        return $topic;
    }

    return null;
}


class Topic
{
    public string $id;
    public string $name;
    public string $desp;

    public string $image;

    public string $article_count;

    public bool $followed;
    public string $followers;

    public string $type;

    public string $create_time;
    public string $update_time;


    public array $articles;

    public function __construct(array $result)
    {
        $host = "/bbs";

        $this->id = $result['id'];
        $this->name = $result['name'];
        $this->desp = $result['desp'];
        $this->image = $host . $result['image'];
        $this->type = $result['type'];

        $this->article_count = $result['article_count'];
        $this->followers = $result['followers'];

        $this->create_time = $result['create_time'];
        $this->update_time = $result['update_time'];
    }


    public static function has_followed(Account $account, int $topic_id): bool
    {
        $sql = "SELECT `id` FROM `topic_followers` WHERE topic_id = ? and follower_id = ?";
        $result = fetch_sql($sql, [$topic_id, $account->uid]);
        return empty($result) ? false : true;
    }


    public static function follow(Account $account, int $topic_id): bool
    {
        if (Topic::has_followed($account, $topic_id)) {
            json_error("error");
        }

        try {

            $tx = begin_transaction();


            $sql = "INSERT INTO `topic_followers`(`topic_id`, `follower_id`,`create_time`) VALUES (?,?,?)";
            execute_sql($sql, [$topic_id, $account->uid, time()]);

            $sql = "UPDATE `topic` SET followers=followers+1 WHERE id = ?";
            execute_sql($sql, [$topic_id]);


            $tx->commit();
            return true;
        } catch (\Throwable $e) {
            echo $e->getTraceAsString();
            $tx->rollBack();
            return false;
        }
    }


    public static function cancel_follow(Account $account, int $topic_id): bool
    {
        try {
            // $pdo = connect_mysql();
            // $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $tx = begin_transaction();

            $sql = "DELETE FROM `topic_followers` WHERE topic_id = ? and follower_id = ?";
            execute_sql($sql, [$topic_id, $account->uid]);

            $sql = "UPDATE `topic` SET followers=followers-1 WHERE id = ?";
            execute_sql($sql, [$topic_id]);

            $tx->commit();
            return true;
        } catch (\Throwable $e) {
            echo $e->getTraceAsString();
            $tx->rollBack();
            return false;
        }
    }
}