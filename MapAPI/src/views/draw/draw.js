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
    draw(geoType){
      const vm = this
      if(vm.drawTool){
        vm.drawTool.changeGeoType(geoType)
      }else{
        vm.drawTool = new KMap.Draw(geoType)
      }
    },
    clear(){
      const vm = this
      if(vm.drawTool){
        vm.drawTool.clear()
      }
    },
    destory(){
      const vm = this
      if(vm.drawTool){
        vm.drawTool.destory()
      }
    },
    active(){
      const vm = this
      if(vm.drawTool){
        vm.drawTool.active()
      }
    },
    deactive(){
      const vm = this
      if(vm.drawTool){
        vm.drawTool.deactive()
      }
    }
  }
}
