<?php

require_once 'base.php';

class Ecsrp
{

    static bool $use_local_host = true;


    public static function signup(string $email, string $password)
    {
        if ($email == "" || $password == "") {
            echo "Error: One of the fields has been left blank.";
        } else {

            // Check if the email ends with either 'uwec.edu' or 'cvtc.edu'
            $allowedDomains = ['uwec.edu', 'cvtc.edu'];
            $validEmail = false;

            foreach ($allowedDomains as $domain) {
                if (strtolower(substr($email, -strlen($domain))) === strtolower($domain)) {
                    $validEmail = true;
                    break;
                }
            }

            if (!$validEmail) {
                echo "Error: Only users with 'uwec.edu' or 'cvtc.edu' email addresses are allowed to sign up.";
            } else {

                $pdo = ecsrp_database_connect();
                $statement = $pdo->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
                $response = $statement->execute([$email, $password]);

                if ($response) {
                    echo "User has been successfully added";
                    echo '<meta HTTP-EQUIV="REFRESH" content="0; url=homepage.html">';
                } else {
                    echo "Error adding user";
                }
            }
        }
    }


    public static function login(string $email, string $password)
    {
        if ($email == "" || $password == "") {
            echo "Error: One of the fields has been left blank.";
        } else {
            // Check if the email ends with either 'uwec.edu' or 'cvtc.edu'
            $allowedDomains = ['uwec.edu', 'cvtc.edu'];
            $validEmail = false;

            foreach ($allowedDomains as $domain) {
                if (strtolower(substr($email, -strlen($domain))) === strtolower($domain)) {
                    $validEmail = true;
                    break;
                }
            }

            if (!$validEmail) {
                echo "Error: Only users with 'uwec.edu' or 'cvtc.edu' email addresses are allowed to sign up.";
            } else {
                $userinfo = Ecsrp::find_user($email);
                if (isset($password)) {
                    $user_password = $userinfo['password'];
                    if ($password == $user_password) {
                        $_SESSION["id"] = $userinfo['userID'];
                        echo "Login successfully";
                        echo '<meta HTTP-EQUIV="REFRESH" content="0; url=homepage.html">';
                        return;
                    }
                }

                echo "Error adding user";
            }
        }

    }

    public static function find_user(string $email): array|null
    {
        $pdo = ecsrp_database_connect();
        $statement = $pdo->prepare("select userID,email,password from users where email = ?");
        $response = $statement->execute([$email]);
        $data = $statement->fetch(PDO::FETCH_ASSOC);
        var_dump($data);
        if (count($data) === 1) {
            return $data;
        }
        return null;
    }

}




function ecsrp_database_connect(): PDO
{
    DEFINE('DB_USER', 'CHADWICJ4418');
    DEFINE('DB_PASSWORD', 'CAXTYVKF');
    DEFINE('DB_HOST', 'wayne.cs.uwec.edu');
    DEFINE('DB_NAME', 'cs485group1');

    global $pdo;

    if (isset($pdo)) {

        return $pdo;
    }

    $use_local_host = Ecsrp::$use_local_host;

    $servername = $use_local_host ? "localhost" : 'wayne.cs.uwec.edu';  
    $username = $use_local_host ? "root" : 'CHADWICJ4418';              
    $password = $use_local_host ? "" : 'CAXTYVKF';                     
    $db_name = $use_local_host ? "bbs" : "cs485group1";                 
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$db_name", $username, $password);
        return $conn;
    } catch (PDOException $e) {
        json_error("connect fail");
        die;
    }
}