#!/bin/bash
sudo apt-get update -y
sudo apt-get install python3-mysqldb docker docker.io -y
sudo docker pull mariadb
sudo docker container stop crash_db
sudo docker container rm crash_db
sudo docker container prune --force
sudo mkdir -p /opt/crashdb/mysql-data #Later make the DB persistent
res=$(sudo docker run -itd --env MARIADB_ROOT_PASSWORD="Test" --name crash_db --expose 3306 mariadb)
IPADDR="$(sudo docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $res)"
export CRASH_DB_IPADDR="$IPADDR"
echo "$CRASH_DB_IPADDR"
sleep 10 # Wait for mariadb to init
res=$(sudo mariadb --host=$CRASH_DB_IPADDR -p"Test" < setup.sql) 
echo $res
#mkdir ./csvs
#python3 setup_db.py