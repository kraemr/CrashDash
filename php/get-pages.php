<?php
#tabellen api
require("db-conn.php");
$conn = connect_db();

if(isset($_GET["col"])){
    $filter_col = $_GET["col"];
}else{
    $filter_col = "None";
}

if(isset($_GET["val"])){
    $filter_val = $_GET["val"];
}
else{
    $filter_col = "None";
}
$filter_cond = "None";
if(isset($_GET["cond"])){
    $filter_cond = $_GET["cond"];
}

$fval = ""; 
if($filter_cond=="less"){
    $filter_cond ="<";
}
else if($filter_cond=="greater"){
    $filter_cond =">";
}
else if($filter_cond=="eq"){
    $filter_cond ="=";
}
else if($filter_cond=="lesseq"){
    $filter_cond ="<=";
}
else if($filter_cond=="greatereq"){
    $filter_cond =">=";
}
else{
    $filter_cond = "None";
}

$page = 1;
if(isset($_GET["page"])){
    $page = $_GET["page"];
}
if($page < 1){
    //error
    $page=1;
}
$page = $page - 1; # page 0 is actually 
$perpage = 100;
$offset = $page * 100;
require('util.php');
if($filter_col == "None" || $filter_cond == "None" || $filter_val == "None"){
    $sql = "Select * from accident_data $JOINS LIMIT 100 OFFSET ?";
    try{
        $query = $conn->prepare($sql);
        $query->bindValue(1,$offset,PDO::PARAM_INT);
        $query->execute();
        $results = $query->fetchAll(PDO::FETCH_ASSOC);
        header('Content-Type: application/json');
        echo json_encode($results);
    }
    catch(PDOException $e) {
        header('Content-Type: application/json');
        echo '{"error":"Database Error"}';
    }
}
else{
    $sql = "Select * from accident_data $JOINS where accident_data.$filter_col $filter_cond ? LIMIT 100 OFFSET ?";
    try{
        $query = $conn->prepare($sql);
        $query->bindValue(1,$filter_val);
        $query->bindValue(2,$offset,PDO::PARAM_INT);
        $query->execute();
        $results = $query->fetchAll(PDO::FETCH_ASSOC);
        header('Content-Type: application/json');
        echo json_encode($results);
    }
    catch(PDOException $e) {
        header('Content-Type: application/json');
        echo '{"error":"Database Error"}';
    }
}
?>