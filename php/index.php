<?php
$servername = "172.17.0.2";
$username = "root";
$password = "Test";

try {
  $conn = new PDO("mysql:host=$servername;dbname=AccidentDB", $username, $password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  echo "Connected successfully";
} catch(PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}


?>
