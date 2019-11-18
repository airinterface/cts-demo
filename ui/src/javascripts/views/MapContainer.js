const accessToken = process.env.MAPBOX_KEY;
const mapStyle    = process.env.MAPBOX_STYLE;
const mapTileURL  = process.env.MAPBOX_TILE_URL;
const mapGeoJSONURL  = process.env.MAPBOX_GEOJSON_URL;


console.info( 'mapStyle = ' + mapStyle );

const template = `<div id='map'></div>`;

function getTillePath() {
  return mapTileURL + "/{z}/{x}/{y}.png";
}

function getGeoJSONPath() {
  return mapGeoJSONURL;
}

Vue.component('map-container', {
  template:  template,
  props:[ 'accessToken' ],
  data: function(){
    return {
      count:1,
      accessToken: accessToken,
      zoom: 20,
      mapStyle: "mapbox://styles/mapbox/" + mapStyle,
      center: [ 80.49628754229809 , 7.993355810173867]
    };
  },
  mounted: function() {
    // We need to set mapbox-gl library here in order to use it in template
    mapboxgl.accessToken = this.$data.accessToken;
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v10',
        maxZoom: 9,
        minZoom: 4,
        zoom: 7.06,
        center: this.$data.center
      });

    map.on('load', function() {
     
      map.addSource("raster-tiles", {
        "type": "raster",
        "tiles": [ getTillePath() ],
        "tileSize": 256,
        "attribution": 'Map tiles by <a target="_top" rel="noopener" href="http://stamen.com">Stamen Design</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>'
        });

      map.addSource('hospitals', {
        type: 'geojson',
        data: getGeoJSONPath()
      });

      map.addLayer({
          id: "raster-tiles",
          "type": "raster",
          "source": "raster-tiles",
          "paint": {
            "raster-fade-duration": 0
          }
        });

      map.addLayer({
          "id": "hospitals",
          "type": "circle",
          "source": "hospitals",
          "paint": {
          "circle-radius": 6,
          "circle-color": "#ffeaa7"
          },
          "filter": ["==", "$type", "Point"],
          "text-field": ["get", "name"],
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-offset": [0, 0.8],
          "text-anchor": "top",
          "text-color" : "#dfe6e9"
        });

    });
    window.map = map;
  }
});
