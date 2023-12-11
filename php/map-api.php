<?php
// returns category,kind,type,longitude,latitude and ID
// This gives a page of accident data
// TODO write stored procedures

/*
unfallausgang,
category,
land,
year,
itpkw ist...
*/
function generate_sql($json_data){
    $basic = "Select longitude,latitude,ID from accident_data where accident_data.category = ? 
    and accident_data.kind = ? 
    and accident_data.year = ? 
    and accident_data.bycicle_involved = ? 
    and accident_data.car_involved = ? 
    and accident_data.passenger_involved = ? 
    and accident_data.motorcycle_involved = ?
    and accident_data.delivery_van_involved = ? 
    and accident_data.truck_bus_or_tram_involved = ?";
}

try {
    $year = 2022;
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $json_data = file_get_contents('php://input');
        if (!empty($json_data)) {
            $decoded_data = json_decode($json_data, true);
            require "db-conn.php";
            $conn = connect_db();
            $query = $conn->prepare("Select longitude,latitude,ID from accident_data where 
            accident_data.land = ?
            and accident_data.category = ? 
            and accident_data.kind = ? 
            and accident_data.year = ? 
            and accident_data.bycicle_involved = ? 
            and accident_data.car_involved = ? 
            and accident_data.passenger_involved = ? 
            and accident_data.motorcycle_involved = ?
            and accident_data.delivery_van_involved = ? 
            and accident_data.truck_bus_or_tram_involved = ?");
            $query->bindValue(1,$json_data["land"]);
            $query->bindValue(2,$json_data["kind"]);
            $query->bindValue(3,$json_data["category"]);
            $query->bindValue(4,$json_data["year"]);
            $query->bindValue(5,$json_data["bycicle_involved"]);
            $query->bindValue(6,$json_data["car_involved"]);
            $query->bindValue(7,$json_data["passenger_involved"]);
            $query->bindValue(8,$json_data["motorcycle_involved"]);
            $query->bindValue(9,$json_data["delivery_van_involved"]);
            $query->bindValue(10,$json_data["truck_bus_or_tram_involved"]);
            $query->execute();
            $json_obj = array();
            $i = 0;
            while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
                $json_obj[$i] = $row;
                $i += 1;
            }
            header('Content-Type: application/json');
            echo json_encode($json_obj);
        }
        else{
            header('Content-Type: application/json');
            echo '{"error":"json ERROR"}';
            return;
        }
    }else{
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
}
catch(PDOException $e) {
    header('Content-Type: application/json');
    echo " 'error':'database error' ";
}
?>