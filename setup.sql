# https://stackoverflow.com/questions/4959610/sql-chaining-joins-efficiency
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
    coordinate_UTM_x FLOAT, #LINREFX 
    coordinate_UTM_y FLOAT, #LINREFY
    longitude FLOAT, # x
    latitude FLOAT, # y
    CONSTRAINT PK_Accident_Data PRIMARY KEY (Id)
);
CREATE INDEX IX_accident_year ON accident_data(year);
CREATE INDEX IX_accident_month ON accident_data(month);
CREATE INDEX IX_accident_region ON accident_data(region);
CREATE INDEX IX_accident_land ON accident_data(land);
CREATE INDEX IX_accident_kind ON accident_data(kind);
CREATE INDEX IX_accident_category ON accident_data(category);
Create Table land_def(
    land SMALLINT,
    land_str TINYTEXT,
    CONSTRAINT PK_Land_def PRIMARY KEY (land)
);

Create Table munincipality_def(
    munincipality MEDIUMINT, # Foreign Key
    munincipality_str TINYTEXT,
    CONSTRAINT PK_munincipality_def PRIMARY KEY (munincipality)
);

Create Table kind_def(
    kind TINYINT, # Foreign Key 
    kind_str TINYTEXT,
    CONSTRAINT PK_kind_def PRIMARY KEY (kind)
);

Create Table category_def(
    category TINYINT, # Foreign Key 
    category_str TINYTEXT,
    CONSTRAINT PK_category_def PRIMARY KEY (category)
);

Create Table type_def(
    type TINYINT, # Foreign Key 
    type_str TINYTEXT,
    CONSTRAINT PK_type_def PRIMARY KEY (type)
);


Create Table district_def(
    district MEDIUMINT, # Foreign Key
    district_str TINYTEXT,
    CONSTRAINT PK_district_def PRIMARY KEY (district)
);
CREATE INDEX IX_land_def ON land_def(land);
CREATE INDEX IX_kind_def ON kind_def(kind);
CREATE INDEX IX_cat_def  ON category_def(category);  