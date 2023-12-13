<?php

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