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
        KMap.Common.ShowLevel = [3,22]
        KMap.Common.ShowToolbarControl = false
        window.map = new KMap.Map("map",8,113.27,23.45)
    },
    addPolygon(){
      let vm = this
      let coordinate = [
        new KMap.LngLat(113.3,23.6),
        new KMap.LngLat(113.4,23.6),
        new KMap.LngLat(113.4,23.7),
        new KMap.LngLat(113.3,23.7),
        new KMap.LngLat(113.3,23.6)
      ]
      var style = {fillColor:"rgba(255,0,0,0.5)",strokeColor:"rgba(0,0,255,1)",storkeWidth:3}
      vm.polygon = new KMap.Polygon(coordinate,style)
      // vm.polygon.zoomToExtent(1000)
    },
    removePolygon(){
      const vm = this
      if(vm.polygon){
        vm.polygon.remove()
      }
    },
    showPolygon(){
      const vm = this
      if(vm.polygon){
        vm.polygon.show()
      }
    },
    hidePolygon(){
      const vm = this
      if(vm.polygon){
        vm.polygon.hide()
      }
    },
    zoomToPolygon(){
      const vm = this
      if(vm.polygon == undefined){
        vm.addPolygon()
      }
      vm.polygon.zoomToExtent(1000)
    },
    addCircle(){
      const vm = this
      if(vm.circle == null){
        vm.circle = new KMap.Circle(
          113,
          23,
          20000,
          {
            storkeWidth:1,
            strokeColor:'rgba(255,0,0,0)',
            background:'rgba(0,255,0,1)'
          }
        )
      }
      vm.circle.zoomToExtent(1000)
    },
    removeCircle(){
      const vm = this
      if(vm.circle){
        vm.circle.remove()
      }
    },
    hideCircle(){
      const vm = this
      if(vm.circle){
        vm.circle.hide()
      }
    },
    showCircle(){
      const vm = this
      if(vm.circle){
        vm.circle.show()
      }
    },
  }
}
