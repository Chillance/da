#!/usr/bin/env bash

echo "Adding car with no carplate:"
echo "----------------------------"
curl -i -XPOST -d '{ "color": "blue", "year": 2016 }' -H "Content-Type: application/json" http://127.0.0.1:8080/cars
printf "\n\n"
echo "Adding car with empty carplate:"
echo "-------------------------------"
curl -i -XPOST -d '{ "carplate": "", "color": "blue", "year": 2016 }' -H "Content-Type: application/json" http://127.0.0.1:8080/cars
printf "\n\n"
echo "Adding car 1:"
echo "-------------"
curl -i -XPOST -d '{ "carplate": "123-ZXY", "color": "blue", "year": 2016 }' -H "Content-Type: application/json" http://127.0.0.1:8080/cars
printf "\n\n"
echo "Adding car with same carplate:"
echo "------------------------------"
curl -i -XPOST -d '{ "carplate": "123-ZXY", "color": "purple", "year": 2011 }' -H "Content-Type: application/json" http://127.0.0.1:8080/cars
printf "\n\n"
echo "Adding car 2:"
echo "-------------"
curl -i -XPOST -d '{ "carplate": "ABC-123", "color": "white", "year": 1950 }' -H "Content-Type: application/json" http://127.0.0.1:8080/cars
printf "\n\n"
echo "Adding car 3:"
echo "-------------"
curl -XPOST -d '{ "carplate": "ZZZ-555", "color": "green", "year": 1800 }' -H "Content-Type: application/json" http://127.0.0.1:8080/cars
printf "\n\n"
echo "Adding car 4:"
echo "-------------"
curl -XPOST -d '{ "carplate": "SDF-235", "color": "red", "year": 1830 }' -H "Content-Type: application/json" http://127.0.0.1:8080/cars
printf "\n\n"
echo "Adding car 5:"
echo "-------------"
curl -XPOST -d '{ "carplate": "THJ-733", "color": "red", "year": 1810 }' -H "Content-Type: application/json" http://127.0.0.1:8080/cars
printf "\n\n"
echo "Adding car 6:"
echo "-------------"
curl -XPOST -d '{ "carplate": "JJP-621", "color": "red", "year": 1920 }' -H "Content-Type: application/json" http://127.0.0.1:8080/cars
printf "\n\n"
echo "Getting car ABC-123:"
echo "--------------------"
curl -XGET http://127.0.0.1:8080/cars -d '{ "carplate": "ABC-123" }' -H "Content-Type: application/json"
printf "\n\n"
echo "Updating car ABC-123:"
echo "---------------------"
curl -XPUT -d '{ "color": "pink", "year": 2005 }' -H "Content-Type: application/json" http://127.0.0.1:8080/cars/ABC-123
printf "\n\n"
echo "Getting car ABC-123:"
echo "--------------------"
curl -XGET http://127.0.0.1:8080/cars -d '{ "carplate": "ABC-123" }' -H "Content-Type: application/json"
printf "\n\n"
echo "Getting blue and pink cars:"
echo "---------------------------"
curl -XGET http://127.0.0.1:8080/cars?filter="color=blue,color=pink"
printf "\n\n"
echo "Getting all red cars:"
echo "---------------------"
curl -XGET http://127.0.0.1:8080/cars?filter="color=red"
printf "\n\n"
echo "Getting all cars:"
echo "-----------------"
curl -XGET http://127.0.0.1:8080/cars
printf "\n\n"
echo "Getting all cars, limit 4:"
echo "--------------------------"
curl -XGET http://127.0.0.1:8080/cars?limit=4
printf "\n\n"
echo "Getting all cars, limit 3, offset 1:"
echo "------------------------------------"
curl -XGET 'http://127.0.0.1:8080/cars?limit=3&offset=1'
printf "\n\n"
echo "Getting all cars with year and color fields:"
echo "--------------------------------------------"
curl -XGET http://127.0.0.1:8080/cars?fields=year,color
printf "\n\n"
echo "Getting all cars with year and color fields, filter on color red:"
echo "-----------------------------------------------------------------"
curl -XGET 'http://127.0.0.1:8080/cars?fields=year,color&filter=color=red'
printf "\n\n"
echo "Removing car ABC-123:"
echo "---------------------"
curl -i -XDELETE http://127.0.0.1:8080/cars/ABC-123
printf "\n\n"
echo "Updating car ABC-123:"
echo "---------------------"
curl -i -XPUT -d '{ "color": "yellow", "year": 2002 }' -H "Content-Type: application/json" http://127.0.0.1:8080/cars/ABC-123
printf "\n\n"
