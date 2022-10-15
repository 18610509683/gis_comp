import * as KMap from '@/kmap/ol-map/KMap'
export default {
  name: 'marke',
  data() {
    return {
      imgUrl:require('@/kmap/api-resource/images/AMap/0.png'),
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
        KMap.Common.UseOnlineMap = true
        // KMap.Common.UseSimpleMap = true
        KMap.Common.ShowLevel = [3,22]
        KMap.Common.ShowToolbarControl = false
        window.map = new KMap.Map("map",8,113.27,23.45)
    },
    //高德在线
    addGaoDeOnline(){
      
    },
    //高德离线
    addGaoDeOffline(){

    },
    //百度在线
    addBaiduOnline(){

    },
    //百度离线
    addBaiduOffline(){

    },
    //WGS84在线
    addWGS84Online(){

    },
    //WGS84离线
    addWGS84Offline(){

    }
  }
}
