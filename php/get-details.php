<?php
// This is used to get all info on a single accident
$id=0;
if(isset($_GET["id"])){
    $id = $_GET["id"];
}
else{
    echo '{"error":"id is missing"}';
    return;
}
require "db-conn.php";
$conn = connect_db();
// Process other options here
$query = $conn->prepare("Select * from accident_data where Id = ?");
$query->bindValue(1,$id,PDO::PARAM_INT);
$query->execute();  
$data=$query->fetch();
echo json_encode($data); // im not gonna clean these values up :) its literally just one json_obj
?>