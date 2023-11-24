<?php
// This uses user supplied filters, columnnamess and groupby to count occurences
// TODO: Think about the best way to make this generic for all statistics

/*
{
columns:[
"year","land","" ...
],
condition:"year <= 2022 and land = \"Rhineland-Palantine\" "
group_by:"year"
order_by:"year asc"


}


The query should look like this: Select $column1,$column2, ... ,COUNT(*) from accident_data Where $cond Group by $group_by Order by $orderby;
*/

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the raw POST data
    $json_data = file_get_contents('php://input');
    if (!empty($json_data)) {
        // Decode the JSON data
        $decoded_data = json_decode($json_data, true);
        // Check if JSON decoding was successful
        if ($decoded_data !== null) {
            $cols = $decoded_data["columns"];
            $cond = $decoded_data["condition"];
            $group_by =  $decoded_data["group_by"];
            $orderby =  $decoded_data["order_by"];
            $ascending = $decoded_data["asc"];
            require "db-conn.php";
            $conn = connect_db();    
            // First check if the columns exist
            // Send a JSON response (you can modify this based on your needs)
            $sql = "SELECT ?,COUNT(*) from accident_data ";
            if (!empty($cond)) {
                $sql .= "WHERE ? "; 
            }
            if(!empty($group_by)){
                $sql .= "Group by ? ";
            }
            if(!empty($orderby)){
                $sql .= "order by ?";
            }
            if(!empty($ascending) && !empty($orderby)){
                if($ascending == true){
                    $sql .= "asc";
                }else{
                    $sql .= "desc";
                }
            }
            else{
                $sql .= "asc";
            }
            $query = $pdo->prepare($sql);
            if (!empty($cond) && !empty($group_by) && !empty(order)) {
                $query->bindValue(1,$cond,PDO::PARAM_STRING);
                $query->bindValue(2,$group_by,PDO::PARAM_STRING);
                $query->bindValue(3,$orderby,PDO::PARAM_STRING);
            }

            $query->execute();
        }
        header('Content-Type: application/json');
        echo json_encode(['success' => true, 'data' => $decoded_data]);
    } 
    else {
        // Return a JSON response for decoding error
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
    }


} 
else {
    // Return a JSON response for empty data
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'error' => 'Empty JSON data']);
}

?>