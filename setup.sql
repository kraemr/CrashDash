CREATE DATABASE AccidentDB;
use AccidentDB;
Create Table accident_data(
    Id SERIAL,
    uident BIGINT UNSIGNED, #UIDENTSTLAE
    land SMALLINT, #ULAND
    region MEDIUMINT, #UREGBEZ
    district MEDIUMINT, #UKREIS
    munincipality MEDIUMINT, #UGEMEINDE
    year SMALLINT, 
    day SMALLINT,
    hour SMALLINT,
    month SMALLINT,
    category TINYINT, # UKATEGORIE
    kind TINYINT, # UART
    type TINYINT, # UTYP1
    light_condition TINYINT, # ULICHTVERH
    bycicle_involved BOOLEAN,
    car_involved BOOLEAN,
    passenger_involved BOOLEAN,
    motorcycle_involved BOOLEAN,
    delivery_van_involved BOOLEAN,
    truck_bus_or_tram_involved BOOLEAN,
    road_surface_condition TINYINT,
    coordinate_UTM_x DOUBLE, #LINREFX
    coordinate_UTM_y DOUBLE, #LINREFY
    CONSTRAINT PK_Accident_Data PRIMARY KEY (Id)
);

CREATE INDEX IX_accident_year ON accident_data(year);
CREATE INDEX IX_accident_month ON accident_data(month);
CREATE INDEX IX_accident_region ON accident_data(region);

Create Table land_def(
    land SMALLINT, 
    land_str TINYTEXT
);

Create Table munincipality_def(
    munincipality MEDIUMINT, # Foreign Key
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
