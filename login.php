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
    <title>Login Page</title>
</head>
<body>
    <div class="login-container">
        <h1>Login</h1>
        <form action="login_function.php" method="POST" id = "login">
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
            </div>
            <div class="form-group">
                <button type="submit">Login</button>
            </div>
        </form>
        <h3>Don't have an account?</h3> <a href = "signup.php"> Sign up</a href>
    </div>
</body>
</html>

