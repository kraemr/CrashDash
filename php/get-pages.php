

<?php
#tabellen api
require("db-conn.php");
$conn = connect_db();
$filter_col = $_GET["col"];
$filter_val = $_GET["val"];
$filter_cond = $_GET["cond"];
$fval = ""; 
if($filter_cond=="less"){
    $filter_cond ="<";
}
if($filter_cond=="greater"){
    $filter_cond =">";
}
if($filter_cond=="eq"){
    $filter_cond ="=";
}
if($filter_cond=="lesseq"){
    $filter_cond ="<=";
}
if($filter_cond=="greatereq"){
    $filter_cond =">=";
}
$page = $_GET["page"];
if($page < 1){
    //error
}
$page = $page - 1; # page 0 is actually 
$perpage = 100;
$offset = $page * $perpage;
$sql = "Select * from accident_data where $filter_col $filter_cond ? LIMIT 100 OFFSET ? ";
$query = $conn->prepare($sql);
$query->bindValue(1,$filter_val);
$query->bindValue(2,$offset,PDO::PARAM_INT);
$query->execute();
$results = $query->fetchAll(PDO::FETCH_ASSOC);
header('Content-Type: application/json');
echo json_encode(['success' => true, 'data' => $results]);
?>