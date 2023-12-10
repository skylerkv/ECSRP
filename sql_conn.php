<?php
DEFINE ('DB_USER', 'CHADWICJ4418');
DEFINE ('DB_PASSWORD', 'CAXTYVKF');
DEFINE ('DB_HOST', 'wayne.cs.uwec.edu');
DEFINE ('DB_NAME', 'cs485group1');

$dbc = @mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
OR die('Could not connect to MySQL: ' .
mysqli_connect_error());
 echo "Connection Successful!";
?>
