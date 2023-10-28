#!/bin/bash
sudo docker pull mariadb
sudo docker container stop crash_db
sudo docker container rm crash_db
sudo docker container prune
sudo mkdir -p /opt/crashdb/mysql-data #Later make the DB persistent
res=$(sudo docker run -itd --env MARIADB_ROOT_PASSWORD="Test" --name crash_db --expose 3306 mariadb)
IPADDR="$(sudo docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $res)"
export CRASH_DB_IPADDR="$IPADDR"
echo "$CRASH_DB_IPADDR"
sleep 10
res=$(sudo mariadb --host=$CRASH_DB_IPADDR -p"Test" < setup.sql)
mkdir ./csvs
python3 setup_db.py