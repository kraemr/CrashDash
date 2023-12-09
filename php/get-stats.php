<?php
# This code is probably not safe, but for time reasons well. it is what is
const permitted=["year","land","region","district","munincipality","year","day","month","hour","category",
"kind","type","light_condition","bycicle_involved","car_involved","passenger_involved","motorcycle_involved",
"delivery_van_involved","truck_bus_or_tram_involved","road_surface_condition"];
function check_permitted_columns($cols){ # this checks if an array of cols is allowed to be used
    if(count($cols) == 0){
        return false;
    }
    foreach ($cols as $col) {
        if( in_array($col,permitted) == false){
            return false;
        }
    }
    return true;
}

function check_permitted_column($col){ #check one column only
    return in_array($col,permitted);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the raw POST data
    $json_data = file_get_contents('php://input');
    if (!empty($json_data)) {
        $decoded_data = json_decode($json_data, true);
        if ($decoded_data !== null) {
            $cols = $decoded_data["columns"];
            $permitted = check_permitted_columns($cols);
            if($permitted == false){
                //ERROR
                header('Content-Type: application/json');
                echo '{"error":"invalid Column"}';
                return;
            }            
            $cond_col = $decoded_data["condition_column"];
            $cond_val = $decoded_data["condition_value"];
            $sql = "Select ";
            $colnames ="";
            $operator = $decoded_data["operator"];# <,>,>=,<= or =
            $group_by =  $decoded_data["group_by"]; # column name (string)
            $orderby =  $decoded_data["order_by"]; # column name (string)
            $ascending = $decoded_data["asc"]; # boolean
            # for security reasons we dont just accept input and pass it on, since it does not get validated by prepared staement (which compiles a function in sql backend)
            # instead check if strings match and insert the value else return error
            $operator_val = "";
            if($operator == ">") $operator_val = ">";
            else if($operator == "<") $operator_val = "<";
            else if($operator == "<=") $operator_val = "<=";
            else if(operator == ">=") $operator_val = ">=";
            else $operator_val = "=";
            for($i=0;$i<count($cols);$i+=1){
                $colnames .= $cols[$i] . ",";
            }
            $sql .= $colnames . "COUNT(*) as count from accident_data where";
            if(check_permitted_column($cond_col)){
                $sql .= " " . $cond_col . " " . $operator_val . " ?";
            }
            if(check_permitted_column($group_by)){
                $sql .= " GROUP BY " . $group_by;
            }
            if(check_permitted_column($orderby)){
                $sql .= " ORDER BY " . $orderby;
            }
            if(!empty($ascending) && !empty($orderby)){
                if($ascending == true){
                    $sql .= " asc";
                }else{
                    $sql .= " desc";
                }
            }
            else{
                $sql .= " asc";
            }
            require "db-conn.php";
            $conn = connect_db();  
            try{
                $query = $conn->prepare($sql);
                $query->bindValue(1,$cond_val,PDO::PARAM_STR);
                $query->execute();    
                $results = $query->fetchAll(PDO::FETCH_ASSOC);
                header('Content-Type: application/json');
                echo json_encode(['success' => true, 'data' => $results]);
            }
            catch(PDOException $e) {
                header('Content-Type: application/json');
                echo "Connection failed: " . $e->getMessage();
                return;
            }
        }
    } 
    else {
        // Return a JSON response for decoding error
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
        return;
    }
} 
else {
    // Return a JSON response for empty data
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'error' => 'Empty JSON data or GET request instead of POST']);
}
?>