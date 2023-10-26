Create Database AccidentDB
use AccidentDB
Create Table accident_data(
    land SMALLINT,
    region MEDIUMINT,
    district MEDIUMINT,
    munincipality MEDIUMINT,
    year SMALLINT,
    day SMALLINT,
    month SMALLINT,
    category TINYINT,
    kind TINYINT,
    type TINYINT,
    light_condition TINYINT,
    bycicle_involved BOOLEAN,
    car_involved BOOLEAN,
    passenger_involved BOOLEAN,
    motorcycle_involved BOOLEAN,
    delivery_van_involved BOOLEAN,
    truck_bus_or_tram_involved BOOLEAN,
    road_surface_condition TINYINT,
    coordinate_UTM_x DOUBLE,
    coordinate_UTM_y DOUBLE
);

Create Table land_def(
    land SMALLINT, # Foreign Key ?
    land_str TINYTEXT,
);

Create Table munincipality_def(
    munincipality MEDIUMINT, # Foreign Key ?
    munincipality_str TINYTEXT
);

Create Table kinds_of_accidents_def(
    kind TINYINT, # Foreign Key 
    kind_str TINYTEXT
);

Create Table district_def(
    district MEDIUMINT, # Foreign Key
    district_str TINYTEXT
);