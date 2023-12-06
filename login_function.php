<?php
require_once('sql_conn.php');
session_start();

// user input 'uname' assinged to $uname
$email = $_POST["email"];
$password = $_POST["password"];

// Check the user input data 
if ($email == ''){
    // incomplete input data
    echo "Error: Some input fields do not have data.";
    exit;
}

// checking user existence in database
$findUser =  "SELECT * FROM userData WHERE email = '$email' AND password = '$password'";
$exist = @mysqli_query($dbc, $findUser);

// if 'email' and 'password' does exist in database
if ($exist) {
    $row = mysqli_fetch_assoc($exist);
    $userID = $row["userID"];
    $email = $row["email"];
    $_SESSION['useID'] = $userID;
    $_SESSION['email'] = $email;
    $_SESSION['adminPrivilege'] = $adminPrivilege;

    echo '<meta HTTP-EQUIV="REFRESH" content="0; url=homepage.html">';
}

// if 'email' and 'password' does NOT exist in database
else { 
    echo "No User Exists";
}

@mysqli_close($dbc);
?>