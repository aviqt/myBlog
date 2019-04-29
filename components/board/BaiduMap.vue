<template>
  <baidu-map class="map" :center="center" :zoom="zoom" @ready="handlerMapReady" :mapStyle="mapStyle">
    <bm-marker :position="{lng: 116.404, lat: 39.915}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
      <bm-label content="北京天安门" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/>
    </bm-marker>
  </baidu-map>
</template>

<script>
	export default {
		data() {
			return {
				center: {lng: 0, lat: 0},
        zoom: 4 ,
        mapStyle: {
          styleJson: [
            {
              "featureType": "all",
              "elementType": "geometry",
              "stylers": {
                  "hue": "#007fff",
                  "saturation": 89
              }
            },
            {
              "featureType": "water",
              "elementType": "all",
              "stylers": {
                  "color": "#ffffff"
              }
            }
          ]
        }
			};
		},
    mounted() {
    },
    methods: {
      handlerMapReady ({BMap, map}) {
        // console.log(BMap , map)
        this.center.lng = 116.404
        this.center.lat = 39.915
        this.zoom = 15
      }
    }
	}
</script>

<style coped>
.map {
  height: 110%;
  width: 110%;
}
</style>
