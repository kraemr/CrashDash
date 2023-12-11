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
            $json_obj = array();
            $offset = 0;
            $offset_array = array();
            $any_involved = ($decoded_data["bycicle_involved"] || $decoded_data["car_involved"] || $decoded_data["passenger_involved"] || $decoded_data["motorcycle_involved"] || $decoded_data["delivery_van_involved"] || $decoded_data["truck_bus_or_tram_involved"] );
            
            $basic = "Select longitude,latitude,ID from accident_data where year = ?";
            if($decoded_data["kind"] != -1 || $decoded_data["category"] != 0 || $decoded_data["land"] != 0){
                $basic .= " and";
            }
            if($decoded_data["land"] != 0 ){
                $basic .= " accident_data.land = ?";
                if($decoded_data["kind"] != -1 || $decoded_data["category"] != 0){
                    $basic .= " and";
                }
                $offset_array["land"] = $offset;
                $offset+=1;
            }
            if($decoded_data["kind"] != -1){
                $basic .= " accident_data.kind = ?";
                if($decoded_data["category"] != 0){
                    $basic .= " and";
                }
                $offset_array["kind"] = $offset;
                $offset+=1;
            }
            if($decoded_data["category"] != 0 ){
                $basic .= " accident_data.category = ?";
                $offset_array["category"] = $offset; 
                $offset+=1;
            }


            //$decoded_data["bycicle_involved"] || $decoded_data["bycicle_involved"]  
            // I dont know if this can be done  any cleaner but well this will work
            // Hmmm this probably could have been done with like a stack or smth
            if($decoded_data["bycicle_involved"] == 1){
                $basic .= " and";
                $basic .= " accident_data.bycicle_involved = 1";
                /*
                if(
                    $decoded_data["car_involved"] == 1 || 
                    $decoded_data["passenger_involved"] == 1 || 
                    $decoded_data["motorcycle_involved"]  == 1 || 
                    $decoded_data["delivery_van_involved"] == 1 || 
                    $decoded_data["truck_bus_or_tram_involved"] == 1)
                {
                    $basic .= " and";
                }*/
            }
            if($decoded_data["car_involved"] == 1){
                $basic .= " and";
                $basic .= " accident_data.car_involved = 1";
            }
            if($decoded_data["passenger_involved"] == 1){
                $basic .= " and";
                $basic .= " accident_data.passenger_involved = 1";
            }
            if($decoded_data["motorcycle_involved"] == 1){
                $basic .= " and";
                $basic .= " accident_data.motorcycle_involved = 1";
            }
            if($decoded_data["delivery_van_involved"] == 1){
                $basic .= " and";
                $basic .= " accident_data.delivery_van_involved = 1";
            }
            if($decoded_data["truck_bus_or_tram_involved"] == 1){
                $basic .= " and";
                $basic .= " accident_data.truck_bus_or_tram_involved = 1"; // This would be the last one then
            }
            $query = $conn->prepare($basic);
            if($decoded_data["land"] != 0){
                $query->bindValue(2 + $offset_array["land"],$decoded_data["land"]);
            }
            if($decoded_data["kind"] != -1){
                $query->bindValue(2 + $offset_array["kind"],$decoded_data["kind"]);
            }
            if($decoded_data["category"] != 0){
                $query->bindValue(2 + $offset_array["category"],$decoded_data["category"]);
            }
            $query->bindValue(1,$decoded_data["year"]);
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
    }
    else{
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
    echo json_encode($e->getMessage());
}
?>