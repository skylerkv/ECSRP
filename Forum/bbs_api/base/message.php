<?php
require_once 'base/base.php';
require_once 'base/account.php';


function send_message(string $content, Account $account): bool
{
    $sql = "INSERT INTO `message`(`user_id`, `content`, `has_read`, `create_time`) VALUES (?,?,?,?)";


    $has_read = 0;


    $create_time = time();

    return execute_sql($sql, [$account->uid, $content, $has_read, $create_time]);
}


function mark_all_message_has_read(Account $account)
{
    $sql = "UPDATE `message` SET `has_read`=1 WHERE user_id=? and `has_read`=0";

    return execute_sql($sql, [$account->uid]);
}


function get_message_not_read(Account $account): array
{
    $sql = "SELECT * FROM `message` WHERE has_read=0 and user_id=?";

    return fetch_all_sql($sql, [$account->uid]);
}


class Message
{

    public int $id;


    public int $user_id;

    public string $content;


    public int $has_read;


    public $create_time;

    public function __construct($row)
    {
        $this->id = $row['id'];
        $this->user_id = $row['user_id'];
        $this->content = $row['content'];
        $this->has_read = $row['has_read'];
        $this->create_time = $row['create_time'];
    }
}