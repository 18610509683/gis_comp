import * as KMap from '@/kmap/ol-map/KMap'
export default {
  name: 'marke',
  data() {
    return {
      marker:null,
      infoWindowShow:false
    }
  },
  mounted() {
    this.createMap()
  },
  created() {
  },
  methods: {
    createMap() {
        KMap.Common.UseWGS84OnlineLayer = true;
        KMap.Common.ShowLevel = [1,25];
        KMap.Common.ShowToolbarControl = false;
        window.map = new KMap.Map("map",16,117.81502899727046,32.193969537026035);
    },
    //添加Marker
    addJson(){
      const json = require('@/kmap/api-resource/data/shp-3857.json')
      const layer = new KMap.JsonLoadLayer(json,{projection:"EPSG:3857"})
    }
  }
}
