<?php
  session_start();
  if(isset($_SESSION["id"])){
    echo '<meta HTTP-EQUIV="REFRESH" content="0; url=homepage.html">';
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="loginSignup.css">
    <title>Signup Page</title>
</head>
<body>
    <div class="login-container">
        <h1>Sign Up</h1>
        <form action="sql_connection.php" method="POST">
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
            </div>
            <div class="form-group">
                <button type="submit">Sign Up</button>
            </div>
            <h3>Already have an account?</h3> <a href = "login.php">Log in</a href>
        </form>
    </div>
</body>
</html>
