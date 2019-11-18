# CTS prototype

This displays map with the geojson marker using Vue architecture and its component as wraper for MapBox. 
For now, geojson and ruster tiles are supported. 


#preview

[![N|Solid](https://github.com/airinterface/cts-demo/blob/master/doc/Screenshot_2019-11-18_02-39-40.png)](https://github.com/airinterface/cts-demo/blob/master/doc/Screenshot_2019-11-18_02-39-40.png)

1. Using new est technology
2. Deliver the visualizing flood map 


#architecture

1. From the requirement, I have used module base architecture Vue & MapBox 
2. Optimization could be done to implement server side ( to deliver geoJSON only for zoomed in location ) 

### Installation

Before you run please proceed with step 1, 2. 


#### Step 1
cts-demo requires installing data, and configuring. 
move the asset to ./dist/asset/data location as picture below 

[![N|Solid](https://github.com/airinterface/cts-demo/blob/master/doc/folder_sctructure.png)](https://github.com/airinterface/cts-demo/blob/master/doc/folder_sctructure.png)


#### step 2
Go to mapbox, get the API KEY. 
in the file ./config/.env, replace <ENTER MAPBOX API KEY>> with map ID. 
   
#### step 3 
Install the dependencies and devDependencies and start the server.

```sh
$ npm install -d
$ npm start
```



#TODO 
- geotag to display at zoom in the right offset so that marker and text doesn't overwrap. 
- insert cvs data layer. 
