<?php
// returns category,kind,type,longitude,latitude and ID
// This gives a page of accident data
// TODO write stored procedures
try {
    $year = 2022;
    if(isset($_GET["year"])){
        $year = $_GET["year"];
    }
    else{
        echo '{"error":"year is missing"}';
        return;
    }
    $json_obj = array();
    require "db-conn.php";
    $conn = connect_db();
    // Process other options here
    $query = $conn->prepare("Select ID,kind,type,longitude,latitude from accident_data where year = ?");
    $query->bindValue(1,$year,PDO::PARAM_INT);
    $query->execute();  
    $i = 0;
    while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
        $json_obj[$i] = $row;
        $i += 1;
    }
    echo json_encode($json_obj);
}
catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

?>