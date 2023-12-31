<?php

$JOINS2=
"INNER JOIN land_def ON land_def.land = accident_data.land INNER JOIN kind_def ON kind_def.kind = accident_data.kind" .
" INNER JOIN category_def ON category_def.category = accident_data.category INNER JOIN type_def ON type_def.type = accident_data.type" .
" INNER JOIN light_condition_def ON light_condition_def.light_condition = accident_data.light_condition" .
" INNER JOIN bycicle_involved_def ON bycicle_involved_def.bycicle_involved = accident_data.bycicle_involved" . 
" INNER JOIN car_involved_def ON car_involved_def.car_involved = accident_data.car_involved" .
" INNER JOIN passenger_involved_def ON passenger_involved_def.passenger_involved = accident_data.passenger_involved" .
" INNER JOIN motorcycle_involved_def ON motorcycle_involved_def.motorcycle_involved = accident_data.motorcycle_involved" .
" INNER JOIN delivery_van_involved_def ON delivery_van_involved_def.delivery_van_involved = accident_data.delivery_van_involved" .
" INNER JOIN truck_bus_or_tram_involved_def ON truck_bus_or_tram_involved_def.truck_bus_or_tram_involved = accident_data.truck_bus_or_tram_involved" .
" INNER JOIN road_surface_condition_def ON road_surface_condition_def.road_surface_condition = accident_data.road_surface_condition" .
" INNER JOIN day_def ON day_def.day = accident_data.day";


$JOINS=
"JOIN land_def ON land_def.land = ad.land JOIN kind_def ON kind_def.kind = ad.kind" .
" JOIN category_def ON category_def.category = ad.category JOIN type_def ON type_def.type = ad.type" .
" JOIN light_condition_def ON light_condition_def.light_condition = ad.light_condition" .
" JOIN bycicle_involved_def ON bycicle_involved_def.bycicle_involved = ad.bycicle_involved" . 
" JOIN car_involved_def ON car_involved_def.car_involved = ad.car_involved" .
" JOIN passenger_involved_def ON passenger_involved_def.passenger_involved = ad.passenger_involved" .
" JOIN motorcycle_involved_def ON motorcycle_involved_def.motorcycle_involved = ad.motorcycle_involved" .
" JOIN delivery_van_involved_def ON delivery_van_involved_def.delivery_van_involved = ad.delivery_van_involved" .
" JOIN truck_bus_or_tram_involved_def ON truck_bus_or_tram_involved_def.truck_bus_or_tram_involved = ad.truck_bus_or_tram_involved" .
" JOIN road_surface_condition_def ON road_surface_condition_def.road_surface_condition = ad.road_surface_condition" .
" JOIN day_def ON day_def.day = ad.day";

function send_json_err($msg){
    echo "{\"error\":\"$msg\"}";
}


?>