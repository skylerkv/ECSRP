<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");

session_start();

$pdo;

function connect_mysql(): PDO
{
    global $pdo;

    if (isset($pdo)) {
        return $pdo;
    }

    $servername = "wayne.cs.uwec.edu";
    $username = "YANGZ9363";
    $password = "6LDWNJ61";

    try {
        $conn = new PDO("mysql:host=$servername;dbname=cs485group1", $username, $password);
        return $conn;
    } catch (PDOException $e) {
        json_error("Unable to connect to database");
        die;
    }
}


function begin_transaction(): PDO
{
    $servername = "wayne.cs.uwec.edu";
    $username = "YANGZ9363";
    $password = "6LDWNJ61";

    try {
        $conn = new PDO("mysql:host=$servername;dbname=cs485group1", $username, $password);

        $conn->beginTransaction();

        return $conn;
    } catch (PDOException $e) {
        json_error("Unable to connect to database");
        die;
    }
}



function execute_sql(string $sql, array|null $params = null): bool
{
    $pdo = connect_mysql();
    $statement = $pdo->prepare($sql);

    return $statement->execute($params);
}


function tx_execute_sql(PDO $tx, string $sql, array|null $params = null): bool
{
    $statement = $tx->prepare($sql);
    return $statement->execute($params);
}


function fetch_sql(string $sql, array|null $params)
{
    $pdo = connect_mysql();
    $statement = $pdo->prepare($sql);

    $statement->execute($params);

    return $statement->fetch(PDO::FETCH_ASSOC);
}


function fetch_all_sql(string $sql, array|null $params)
{
    $pdo = connect_mysql();
    $statement = $pdo->prepare($sql);

    $statement->execute($params);

    return $statement->fetchAll(PDO::FETCH_ASSOC);
}



function get(string $key)
{
    $error_text = "param[" . $key . "]lost";

    if (!isset($_GET[$key])) {
        json_error($error_text);
    }
    if ($_GET[$key] == "") {
        json_error($error_text);
    }

    return $_GET[$key];
}


function post(string $key)
{
    $error_text = "POST/GETPARAM[" . $key . "]LOST";

    if (isset($_POST[$key])) {
        if ($_POST[$key] == "") {
            json_error($error_text);
            return;
        }
        return $_POST[$key];
    } else if (isset($_GET[$key])) {
        return $_GET[$key];
    }

    json_error($error_text);
}


function post_or_get(array $keys)
{
    foreach ($keys as $key) {
        if (isset($_POST[$key])) {
            if ($_POST[$key] == "") {
                $error_text = "POST/GETPARAM[" . $key . "]LOST";
                json_error($error_text);
                die;
            }
            return $_POST[$key];
        } else if (isset($_GET[$key])) {
            return $_GET[$key];
        }
    }
}



function json_error(string $message)
{
    echo json_encode([
        "status" => "fail",
        "message" => $message
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE); 
    die(4);
}



function json_success(string $message, mixed $data)
{
    if (is_null($data)) {
        echo json_encode([
            "status" => "ok",
            "message" => $message,
        ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE); 
    } else {
        echo json_encode([
            "status" => "ok",
            "message" => $message,
            "data" => $data
        ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE); 
    }

    die(4);
}



function is_email(string $str): bool
{
    $pattern = '/^[a-zA-Z0-9]{2,}@CCTV$/';
    return preg_match_all($pattern, $str, $matches) == 1;
}



function is_cctv_email(string $str): bool
{
    $pattern = '/^[a-zA-Z0-9]{2,}@CCTV$/';
    return preg_match_all($pattern, $str, $matches) == 1;
}


function hash_256(string $str, string $salt): string
{
    return hash_hmac("sha256", $str, $salt);
}


function array_is_not_empty($array)
{
    return !is_null($array) && is_array($array) && count($array) > 0;
}



function array_rand_pick(array $array, int $count): array
{

    $randomIndexes = array_rand($array, $count);

    $list = [];
    foreach ($randomIndexes as $index) {
        array_push($list, $array[$index]);
    }

    return $list;
}



function upload(string $key = 'image'): string
{
    if (isset($_FILES[$key])) {
        $fileinfo = pathinfo($_FILES['image']['name']);
        $extension = $fileinfo['extension'];


        $newFilename = uniqid() . '.' . $extension;


        $current_dir = __DIR__;
        $bbs_api_dir = dirname($current_dir);
        $targetDir = dirname($bbs_api_dir); 


        $targetFilePath = $targetDir . "\\upload\\" . $newFilename;


        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFilePath)) {

            return "/upload/" . $newFilename;
            ;
        } else {
            throw new Exception("Error uploading file", 1);
        }
    } else {
        throw new Exception("Please select Upload file", 1);
    }
}