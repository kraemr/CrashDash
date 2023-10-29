<?php
$servername = "172.17.0.2";
$username = "root";
$password = "Test";



// This gives a page of accident data
// TODO write stored procedures
try {
  $conn = new PDO("mysql:host=$servername;dbname=AccidentDB", $username, $password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  // echo "Connected successfully";

  $perpage = 100;
  $page = 1; // page 0 would actually be 1 and 1 would be 2

  if(isset($_POST["perpage"])){
    $perpage = $_POST["perpage"];
  }
  if(isset($_POST["page"])){
    $page = $_POST["page"];
  }

  if(isset($_GET["perpage"])){
    $perpage = $_GET["perpage"];
  }

  if(isset($_GET["page"])){
    $page = $_GET["page"];
  }
  $offset = $page * $perpage;


  $query = $conn->prepare("Select * from accident_data LIMIT ? OFFSET ? ");
  $query->bindValue(1,$perpage,PDO::PARAM_INT);
  $query->bindValue(2,$offset,PDO::PARAM_INT);

  $query->execute();  
  $fetch = $query->fetchAll();
  //echo $page;
  //echo "\n";
  //echo $offset;
  //print_r($fetch);
  echo json_encode($fetch);

} catch(PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}


?>
