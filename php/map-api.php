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
        header('Content-Type: application/json');
        echo '{"error":"year is missing"}';
        return;
    }
    $land = 0;
    if(isset($_GET["land"])){
        $land = $_GET["land"];
    }

    $accident_type = -1;
    if(isset($_GET["kind"])){
        $accident_type = $_GET["kind"];
    }

    $json_obj = array();
    require "db-conn.php";
    $conn = connect_db();
    // Process other options here
    if($land > 0 && $accident_type == -1){ // filter by year and land
        $query = $conn->prepare("Select ID,longitude,latitude from accident_data where year = ? and land = ?");
        $query->bindValue(1,$year);
        $query->bindValue(2,$land);
        $query->execute();
    }
    else if($land > 0 && $accident_type != -1){ // filter by year land and type
        $query = $conn->prepare("Select ID,longitude,latitude from accident_data where year = ? and land = ? and kind = ?");
        $query->bindValue(1,$year);
        $query->bindValue(2,$land);
        $query->bindValue(3,$accident_type);
        $query->execute();
    }
    else{ // filter only by year , if all get params except year are empty or = 0
        $query = $conn->prepare("Select ID,longitude,latitude from accident_data where year = ?");
        $query->bindValue(1,$year);
        $query->execute();
    }
    $i = 0;
    while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
        $json_obj[$i] = $row;
        $i += 1;
    }
    header('Content-Type: application/json');
    echo json_encode($json_obj);
}
catch(PDOException $e) {
    header('Content-Type: application/json');
    echo " 'error':'database error' ";
}
?>