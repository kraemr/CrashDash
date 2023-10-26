Create Database AccidentDB
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
