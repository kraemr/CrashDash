import requests
import zipfile
import io
import os
import datetime
import csv
import MySQLdb
import sys

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
    start_year = 2016 #the csvs start at 2016
    current_year = int(datetime.date.today().year)
    year_i = start_year
    year_i = int(year_i)
    while(year_i < current_year):
        print(str(year_i) + ":")
        filestr = ""
        if year_i < 2021:
            filestr = f'csvs/{year_i}/csv/Unfallorte{year_i}_LinRef.csv'
        else:
            filestr = f'csvs/{year_i}/Unfallorte{year_i}_LinRef.csv'
        with open(filestr) as csvf:
            reader = csv.DictReader(csvf,delimiter=";")
            i=0
            for row in reader:
            #print(row)
                uident = 0
                try:
                    uident = int(row["UIDENTSTLAE"]) 
            # this parsing to an int inside a try prevents the weird whitepace number from screwing up our sql queries aswell as if it doesnt exist
                except:
                    uident = 0
                
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


                if(year_i == 2017):
                    light_cond = row["LICHT"]
                    delivery_involved = 0
                else:
                    light_cond = row["ULICHTVERH"]
                    delivery_involved = row["IstGkfz"]

                if(year_i == 2016): # they changed the name of this FOUR TIMES ... just why
                    road_surface_condition=row["IstStrasse"]
                if(year_i == 2017 or year_i == 2018 or year_i == 2019 or year_i == 2020):
                    road_surface_condition=row["STRZUSTAND"]
                if(year_i == 2021):
                    road_surface_condition=row["USTRZUSTAND"]
                if(year_i >= 2022):
                    road_surface_condition = row["IstStrassenzustand"]

                bycicle_involved = row["IstRad"]
                car_involved = row["IstPKW"]
                passenger_involved = row["IstFuss"]
                motorcycle_involved = row["IstKrad"]

                try:
                    truck_bus_or_tram_involved = row["IstSonstige"]
                except:
                    truck_bus_or_tram_involved = row["IstSonstig"]
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
                #print(i)
                #i+=1
                #print(sqlstr)
                cursor.execute(sqlstr)
        db.commit()
        year_i+=1
    db.close()


def fix_csvs():
    list_of_files = os.listdir(os.getcwd() + "/csvs")
    for filename in list_of_files:
        year = filename # year is a directory in csvs years less than 2021 contain additional csv folder where the csv is named .txt ...?????????? why
        list_csv = os.listdir(os.getcwd() + "/csvs/" + year )
        year = int(year)
        if year < 2020:
            list_csv_csv_files = os.listdir(os.getcwd() + "/csvs/" + str(year) + "/csv/")
            if year == 2016:
                try:
                    path = os.getcwd() + "/csvs/" + str(year) + "/csv/" + f"Unfallorte_{year}_LinRef.txt"
                    newpath = os.getcwd() + "/csvs/" + str(year) + "/csv/" + f"Unfallorte{year}_LinRef.csv"
                    os.rename(path,newpath)
                except:
                    print("File not found or already fixed to be .csv")                    
            else:
                try:
                    path = os.getcwd() + "/csvs/" + str(year) + "/csv/" + f"Unfallorte{year}_LinRef.txt"
                    newpath = os.getcwd() + "/csvs/" + str(year) + "/csv/" + f"Unfallorte{year}_LinRef.csv"
                    os.rename(path,newpath)
                except:
                    print("File not found or already fixed to be .csv")                    
        
def main():
    print(sys.argv)
    if sys.argv[1] == "-d" or sys.argv[1] == "--download":
        download_all()
    if sys.argv[1] == "-p" or sys.argv[1] == "--parse":
        parse_csv()
    if sys.argv[1] == "-f" or sys.argv[1] == "--fix":
        fix_csvs()

if __name__=="__main__":
    main()