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
    addLayer(){
      //注意顺序
      this.layer = new KMap.CustomLayer('http://47.107.126.107:9000/map/foshan/{z}/{y}/{x}.png')
      window.map.setZoomAndCenter(12,new KMap.LngLat(112.85,22.88))
    },
    showLayer(){
      if(this.layer){
        this.layer.show()
      }
    },
    hideLayer(){
      if(this.layer){
        this.layer.hide()
      }
    },
    removeLayer(){
      if(this.layer){
        this.layer.remove()
      }
    }
  }
}
