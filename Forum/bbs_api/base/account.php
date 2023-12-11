<?php

require_once 'base.php';

$password_key = "#7989f";


function create_account(string $email, string $password): bool
{
    must_is_standard_mail($email);
    
    global $password_key;
    $pdo = connect_mysql();

    global $password_key;
    $a = find_account($email);
    if ($a) {

        json_error("This email address is already registered, duplicate registration is not allowed");
    }

    $sha256_password = hash_256($password, $password_key);

    try {
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $pdo->beginTransaction();

        $sql_user_add = "INSERT INTO `users`(`userID`, `email`, `password`, `adminPrivilege`) VALUES (?,?,?,?)";
        $statement_user_add = $pdo->prepare($sql_user_add);
        $ok = $statement_user_add->execute([$email, $password, 'N']); 
        if (!$ok) {
            $pdo->rollBack();
            return false;
        }

        $insert_id = $pdo->lastInsertId();


        $sql = "INSERT INTO `account`(`id`,`email`, `password`,`is_manager`,`nickname`, `create_time`, `login_time`) VALUES (?,?,?,?,?,?)";
        $statement = $pdo->prepare($sql);

        $now = time();

        preg_match('/^([a-zA-Z0-9._%-]+)@/', $email, $matches);
        $nickname = $matches[1];

        $is_manager = 0;


        $ok = $statement->execute([$insert_id, $email, $sha256_password, $is_manager, $nickname, $now, $now]);
        if (!$ok) {
            $pdo->rollBack();
            return false;
        }

        $pdo->commit();

        return true;
    } catch (\Throwable $th) {
        $pdo->rollBack();
        echo "Failed: " . $th->getMessage();
        return false;
    }

}


function login_account(string $email, string $password): bool
{
    must_is_standard_mail($email);

    global $password_key;
    $a = find_account($email);
    if ($a) {
        if ($password == $a->password) {
            $_SESSION['id'] = $a->uid;
            return true;
        }
    } else {
        json_error("The email address is not registered. You can register first and then log in");
    }

    return false;
}


function is_login_no_autostop(): Account|null
{
    if (empty($_SESSION['id'])) {
        return null;
    }

    return find_account_by_uid($_SESSION['id']);
}


function is_login(): Account
{
    if (empty($_SESSION['id'])) {
        json_error("Not logged in, unable to continue");
    }

    return find_account_by_uid($_SESSION['id']);
}


function is_manager_login(): Account
{
    $user = is_login();
    if ($user->is_manager != 1) {

        json_error("Not an administrator, unable to continue");
    }
    return $user;
}


function find_all_account(): array|false
{
    $result = fetch_all_sql("SELECT * FROM `account` join users on users.userID = account.id", null);

    $account_list = array_map(function ($user) {
        return new Account($user);
    }, $result);

    return $account_list;
}


function find_account(string $email): Account|false
{
    $pdo = connect_mysql();

    $statement = $pdo->prepare("SELECT * FROM users join `account` on users.userID = account.id where users.email = ?");
    $statement->execute([$email]);

    $result = $statement->fetch(PDO::FETCH_ASSOC);

    if (is_array($result)) {
        return new Account($result);
    }

    return false;
}


function find_account_by_uid(int $uid): Account|false
{
    $pdo = connect_mysql();

    $statement = $pdo->prepare("SELECT * FROM `account` join users on users.userID = account.id WHERE userID = ?");
    $statement->execute([$uid]);

    $result = $statement->fetch(PDO::FETCH_ASSOC);
    if (is_array($result)) {
        return new Account($result);
    }

    return false;
}


function must_is_standard_mail(string $email)
{
    if ($email == "") {
        json_error("Error: One of the fields has been left blank.");
        die;
    } else {
        $allowedDomains = ['uwec.edu', 'cvtc.edu'];
        $validEmail = false;

        foreach ($allowedDomains as $domain) {
            if (strtolower(substr($email, -strlen($domain))) === strtolower($domain)) {
                $validEmail = true;
                break;
            }
        }

        if (!$validEmail) {
            json_error("Error: Only users with 'uwec.edu' or 'cvtc.edu' email addresses are allowed to sign up or login.");
            die;
        }
    }
}

class Account
{
    public int $uid;

    public string $email;

    public string $password;

    public bool $is_manager;

    public string $nickname;

    public int $followers;

    public string $create_time;

    public string $login_time;

    public function __construct(array $data)
    {
        $this->uid = $data['userID'];
        $this->email = $data['email'];
        $this->password = $data['password'];
        $this->nickname = $data['nickname'];
        $this->followers = $data['followers'];
        $this->create_time = $data['create_time'];
        $this->login_time = $data['login_time'];
        $this->is_manager = $data['adminPrivilege'] == 'Y' ? true : false;
    }


    public function follow(Account $account): bool
    {

            json_error("error");
        }

        if ($this->has_followed($account)) {
            json_error("error");
        }

        try {

            $tx = begin_transaction();


            $sql = "INSERT INTO `account_followers`(`uid`, `follower_id`) VALUES (?,?)";
            execute_sql($sql, [$account->uid, $this->uid]);


            $sql = "UPDATE `account` SET followers=followers+1 WHERE id = ?";
            execute_sql($sql, [$account->uid]);


            $tx->commit();
            return true;
        } catch (\Throwable $e) {
            $tx->rollBack();
            return false;
        }

    }

    public function cancel_follow(Account $account): bool
    {

        if ($account->uid == $this->uid) {

            json_error("error");
        }



        try {
            // $pdo = connect_mysql();
            // $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $tx = begin_transaction();

            $sql = "DELETE FROM `account_followers` WHERE uid = ? and follower_id = ?";
            execute_sql($sql, [$account->uid, $this->uid]);


            $sql = "UPDATE `account` SET followers=followers-1 WHERE id = ?";
            execute_sql($sql, [$account->uid]);


            $tx->commit();
            return true;
        } catch (\Throwable $e) {
            $tx->rollBack();
            return false;
        }
    }



    public function has_followed(Account $account): bool
    {
        $sql = "SELECT `id` FROM `account_followers` WHERE uid = ? and follower_id = ?";
        $result = fetch_sql($sql, [$account->uid, $this->uid]);
        return empty($result) ? false : true;
    }



    public function get_follow_list(): array
    {
        $sql = "SELECT uid FROM `account_followers` where follower_id = ?";
        $result = fetch_all_sql($sql, [$this->uid]);

        return array_map(function ($row) {
            return $row['uid'];
        }, $result);
    }



    function login_out()
    {
        unset($_SESSION['id']);
    }
}