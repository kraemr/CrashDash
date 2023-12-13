<?php
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
require "util.php";
$query = $conn->prepare("Select * from accident_data $JOINS2 where Id = ? ");
$query->bindValue(1,$id,PDO::PARAM_INT);
$query->execute();  
$data = $query->fetch(PDO::FETCH_ASSOC);
echo json_encode($data); // im not gonna clean these values up :) its literally just one json_obj
?>