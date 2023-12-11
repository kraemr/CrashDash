var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
var url = "../php/get-stats.php";
xmlhttp.open("POST", url);
xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xmlhttp.send(JSON.stringify({
    "condition_column":"year",
    "condition_value":2022,
    "operator":"=",
    "group_by":"land",
    "order_by":"land",
    "asc":false,
    "columns":["year","land"]
}));