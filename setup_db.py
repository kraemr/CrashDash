import requests
import zipfile
import io
import os
import datetime
import csv

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

#download_all()
with open('csvs/2022/Unfallorte2022_LinRef.csv') as csvf:
    reader = csv.DictReader(csvf,delimiter=";")
    for row in reader:
        print(row)
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
        coordinate_UTM_x = row["LINREFX"]
        coordinate_UTM_y = row["LINREFY"]
        # Now insert all these Values into the DB with a mysql driver