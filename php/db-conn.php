<?php
function connect_db(){
    $servername = "172.17.0.2";
    $username = "root";
    $password = "Test";
    return new PDO("mysql:host=$servername;dbname=AccidentDB", $username, $password);
}
?>