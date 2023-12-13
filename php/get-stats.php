<?php
# This code is probably not safe, but for time reasons well. it is what is
const permitted=["year","land","region","district","munincipality","year","day","month","hour","category",
"kind","type","light_condition","bycicle_involved","car_involved","passenger_involved","motorcycle_involved",
"delivery_van_involved","truck_bus_or_tram_involved","road_surface_condition","count"];


const no_defs=["year","month","hour"];

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

function col_has_def($col){
    return ! in_array($col,no_defs);
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
                header('Content-Type: application/json');
                echo '{"error":"invalid Column"}';
                return;
            }
            $year = $decoded_data["year"];   
            $cond_col = $decoded_data["condition_column"];
            $cond_val = $decoded_data["condition_value"];
            $sql = "Select ";

            $colnames ="";
            $operator  = "";
            $group_by = "";
            $orderby = "";
            $ascending = "";
            
            if(!empty($decoded_data["operator"])){
                $operator = $decoded_data["operator"];# <,>,>=,<= or =
            }
            if(!empty($decoded_data["group_by"])){
                $group_by =  $decoded_data["group_by"]; # column name (string)
            }
            if(!empty($decoded_data["order_by"])){
                $orderby =  $decoded_data["order_by"]; # column name (string)
            }
            if(!empty($decoded_data["asc"])){
                $ascending = $decoded_data["asc"]; # boolean
            }
            
            
            # for security reasons we dont just accept input and pass it on, since it does not get validated by prepared staement (which compiles a function in sql backend)
            # instead check if strings match and insert the value else return error
            $operator_val = "";
            if($operator == ">") $operator_val = ">";
            else if($operator == "<") $operator_val = "<";
            else if($operator == "<=") $operator_val = "<=";
            else if($operator == ">=") $operator_val = ">=";
            else if($operator == "=") $operator_val = "=";
            else $operator_val = "";

            for($i=0;$i<count($cols);$i+=1){
                if(col_has_def($cols[$i])){
                    $colnames .= $cols[$i] . "_def." . $cols[$i] . "_str" . ",";
                }
                else{
                    $colnames .= $cols[$i] . ",";
                }
            }

            $sql .= $colnames . "COUNT(*) as count from accident_data";
            if(!empty($group_by) && check_permitted_column($group_by)){
                for($i=0;$i<count($cols);$i+=1){
                    if(col_has_def($cols[$i])){
                        $sql .= " INNER JOIN " . $cols[$i] . "_def ON " . $cols[$i] . "_def." . $cols[$i] . " = accident_data." . $cols[$i];
                    }
                }
                if(!empty($cond_col) && check_permitted_column($cond_col)){
                    $sql .= " where year=?";
                    $sql .= $cond_col . " " . $operator_val . " ?";
                }
                else{
                    $sql .= " where year=?";
                }
                $sql .= " GROUP BY " . "accident_data." . $group_by;
                if(!empty($orderby) && check_permitted_column($orderby)){
                    if($orderby == "count"){
                        $sql .= " ORDER BY " . $orderby;

                    }else{
                        $sql .= " ORDER BY accident_data." . $orderby;
                    }
                }
                if($ascending == 1){
                    $sql .= " asc";
                }
                else if($ascending == 0){
                    $sql .= " desc";
                }
                
    
            }
            require "db-conn.php";
            $conn = connect_db();
            
            if(empty($cond_col) || empty($cond_val)){
                try{
                    $query = $conn->prepare($sql);
                    $query->bindValue(1,$year);
                    $query->execute();    
                    $results = $query->fetchAll(PDO::FETCH_ASSOC);
                    header('Content-Type: application/json');
                    echo json_encode(['success' => true, 'data' => $results]);
                    return;
                }
                catch(PDOException $e){
                    header('Content-Type: application/json');
                    echo "Connection failed: " . $e->getMessage();
                    return;
                }
            }else{
                try{
                    $query = $conn->prepare($sql);
                    $query->bindValue(1,$year);
                    $query->bindValue(2,$cond_val);
                    $query->execute();    
                    $results = $query->fetchAll(PDO::FETCH_ASSOC);
                    header('Content-Type: application/json');
                    echo json_encode(['success' => true, 'data' => $results]);
                return;
                }
                catch(PDOException $e) {
                    header('Content-Type: application/json');
                    echo "Connection failed: " . $e->getMessage();
                    return;
                }
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
    return;
}
?>