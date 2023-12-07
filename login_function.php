<?php
require_once('sql_conn.php');
session_start();

$email = $_POST["username"];
$password = $_POST["password"];

// Check the user input data 
if ($email == ''|| $password == ''){
    // incomplete input data
    echo "Error: Some input fields do not have data.";
    exit;
}

// checking user existence in database
$findUser =  "SELECT * FROM cs485group1.users WHERE email = ? AND password = ?";
$stmt = mysqli_prepare($dbc, $findUser);
mysqli_stmt_bind_param($stmt, "ss", $email, $password);
mysqli_stmt_execute($stmt);

// Get the result
$result = mysqli_stmt_get_result($stmt);

// if 'email' and 'password' does exist in database
if ($row = mysqli_fetch_assoc($result)) {
    $userID = $row["userID"];
    $email = $row["email"];
    $adminPrivilege = $row["adminPrivilege"];
    $_SESSION['userID'] = $userID;
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