import * as KMap from '@/kmap/ol-map/KMap'
export default {
  name: 'apiUse',
  data() {
    return {
    }
  },
  mounted() {
    this.createMap()
  },
  created() {
  },
  methods: {
    createMap() {
      // KMap.Common.UseSimpleMap = true
      KMap.Common.UseOnlineMap = true
      KMap.Common.ShowLevel = [3,22]
      KMap.Common.ShowToolbarControl = false
      window.map = new KMap.Map("map",8,113.27,23.45)
    },
    //添加路况地图
    addRadar(){
      const vm = this
      if(vm.radar == null){
        //添加雷达图
        vm.radar = new KMap.Radar({
          lng: 113,
          lat: 23,
          radius: 50,
          color: "rgba(0,255,0,.5)"
        })
      }
    }
  }
}
