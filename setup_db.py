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

start_year = 2016 #the csvs start at 2016
current_year = datetime.date.today().year
year = start_year
while(year <current_year):
    download_zip('https://www.opengeodata.nrw.de/produkte/transport_verkehr/unfallatlas/Unfallorte' + str(year)+'_EPSG25832_CSV.zip', year)
    year+=1