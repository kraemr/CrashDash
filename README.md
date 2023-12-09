# CrashDash
Crash Dashboard written in php, html and css

## DB Backend
- Mariadb
- DB:UnfallDB
- Table1:accident_data contains keys for def, to return text results join the keys with def
- Table2:land_def, keys --> text

## Server
Make a PHP Api, where you can just request data in json.


## Frontend Map
- Html5 Canvas, Insert Points into the Canvas, on zoom reload canvas


## Ajax/Map Tutorials
- https://www.youtube.com/watch?v=rJesac0_Ftw
- https://www.youtube.com/watch?v=wSNa5b1mS5Y (Better / Way more convenient visualisation of the Data but idk if we are allowed to use tbh) 

## Heatmap
### Map Api data
Get category,kind,type,longitude,latitude and ID
Get param year
Select from ... where year

###  Click on map point --> Show all data
Get all data when clicking on a point by its SERIAL ID from GET Param id
Select ... from where ID

## How to call the api/s 
get-details.php?id=
id is ID of accident in Database (Primary Key)

get-pages.php?page=0&col=year&cond=eq&val=2016
page = current page
col = column to filter
cond = >,<,<= ...
val = the value which gets used to filter
get-stats.php?

## Security / Apache config
webroot should be Webpage and anything else should be inaccessible to the user, also only execute php in php folder.

## Db setup/ apache2 Config
```bash
sudo ./setup.sh
#replace /etc/apache2/apache2.conf with the one in CrashDash
sudo chmod 775 /var/www/html
sudo mv apache2.conf /etc/apache2/apache2.conf
sudo service apache2 restart
sudo cp -r . /var/www/html
```


## Map Problems
- Performance : Idee (Mehr filtering z.b bundesland by default in sql)
- Memory limit in apache php is reached when calling map api --> leads to http 500, 
Solution: set max_memory_limit in apaches php config to 256M 
