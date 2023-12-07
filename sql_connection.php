<?php
require_once('sql_conn.php');

if ($_POST["username"] == "" || $_POST["password"] == "") { 
    echo "Error: One of the fields has been left blank.";
} else {
    $email = $_POST["username"];
    $password = $_POST["password"];

    $sql = "INSERT INTO cs485group1.users (email, password) VALUES (?, ?)";
    $stmt = mysqli_prepare($dbc, $sql);
    mysqli_stmt_bind_param($stmt, "ss", $email, $password);
    $response = mysqli_stmt_execute($stmt);

    if ($response) {
        echo "User has been successfully added";
        echo '<meta HTTP-EQUIV="REFRESH" content="0; url=homepage.html">';
    } else {
        echo "Error adding user";
    }
}

mysqli_close($dbc);
?>