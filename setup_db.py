import requests
import zipfile
import io
import os
import datetime
import csv
import MySQLdb

def download_zip(zip_file_url,year):
    response = requests.get(zip_file_url)
    if response.status_code == 200:
        with io.BytesIO(response.content) as zip_data:
                with zipfile.ZipFile(zip_data, "r") as zip_ref:
                    zip_ref.extractall("csvs/"+str(year))
    else:
        return -1
def download_all():
    start_year = 2016 #the csvs start at 2016
    current_year = datetime.date.today().year
    year = start_year
    while(year <current_year):
        download_zip('https://www.opengeodata.nrw.de/produkte/transport_verkehr/unfallatlas/Unfallorte' + str(year)+'_EPSG25832_CSV.zip', year)
        year+=1

def parse_csv():
    db = MySQLdb.connect(host="172.17.0.2",    # your host, usually localhost
                     user="root",         # your username
                     passwd="Test",  # your password
                     db="AccidentDB")        # name of the data base
    cursor = db.cursor()
    with open('csvs/2022/Unfallorte2022_LinRef.csv') as csvf:
        reader = csv.DictReader(csvf,delimiter=";")
        i=0
        for row in reader:
            #print(row)
            uident = row["UIDENTSTLAE"]
            land = row["ULAND"]
            region = row["UREGBEZ"]
            district = row["UKREIS"]
            munincipality = row["UGEMEINDE"]
            year = row["UJAHR"]
            day = row["UWOCHENTAG"]
            month = row["UMONAT"]
            hour = row["USTUNDE"]
            category = row["UKATEGORIE"]
            kind = row["UART"]
            type = row["UTYP1"]
            light_cond = row["ULICHTVERH"]
            road_surface_condition = row["IstStrassenzustand"]
            bycicle_involved = row["IstRad"]
            car_involved = row["IstPKW"]
            passenger_involved = row["IstFuss"]
            motorcycle_involved = row["IstKrad"]
            delivery_involved = row["IstGkfz"]
            truck_bus_or_tram_involved = row["IstSonstige"]
            #WHY IS THIS NOT IN THE PROPER FORMAT BY DEFAULT AND WHY ARE THERE FUCKING WHITESPACES/TABS INSIDE OF A NUMBER IN THE CSV !?=!"?!?!?!?!??!"
            #Tax Money at work i guess :)
            coordinate_UTM_x = row["LINREFX"].replace(",",".") 
            coordinate_UTM_y = row["LINREFY"].replace(",",".")
            sqlstr="INSERT INTO accident_data(uident,land,region,district,munincipality,"
            sqlstr+="year,day,hour,month,category,kind,type,light_condition,bycicle_involved,car_involved,"
            sqlstr+="passenger_involved,motorcycle_involved,delivery_van_involved,truck_bus_or_tram_involved,"
            sqlstr+="road_surface_condition,coordinate_UTM_x,coordinate_UTM_y)"
            sqlstr+=f"VALUES({uident},{land},{region},{district},{munincipality},{year},{day},{hour},{month},"
            sqlstr+=f"{category},{kind},{type},{light_cond},{bycicle_involved},{car_involved},"
            sqlstr+=f"{passenger_involved},{motorcycle_involved},{delivery_involved},{truck_bus_or_tram_involved},"
            sqlstr+=f"{road_surface_condition},{coordinate_UTM_x},{coordinate_UTM_y});"
            print(i)
            i+=1
            cursor.execute(sqlstr)
    db.commit()
    db.close()
#download_all()
parse_csv()
