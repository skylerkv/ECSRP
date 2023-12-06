<?php
require_once('sql_conn.php');

if($_POST["email"] == "" || $_POST["password"] == ""){ 
    echo "Error: One of the fields has been left blank.";
}
else{
    $email = $_POST["email"];
    $password = $_POST["password"];
    $sql = "INSERT INTO userData (email, password) VALUES ('$email', '$password')";
    $response = @mysqli_query($dbc, $sql);
    if($response){
        echo "User has been successfully added";
        echo '<meta HTTP-EQUIV="REFRESH" content="0; url=login.php">';
    } else{
        echo "Error adding user";
    }
}

@mysqli_close($dbc);
?>