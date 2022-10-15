let map = null
export default {
  name: 'apiUse',
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
      KMap.Common.ShowLevel = [3,22]
      KMap.Common.ShowToolbarControl = true
      window.map = new KMap.Map("map",8,113.27,23.45)
    },
    addOverView(){
      const vm = this
      if(vm.overView == null){
        vm.overView = new KMap.OverView()
      }
    },
    removeOverView(){
      const vm = this
      if(vm.overView){
        vm.overView.remove()
        vm.overView = null
      }
    },
    showMouseTool(){
      const vm = this
      if(vm.mouseTool == null){
        vm.mouseTool = new KMap.MouseTool()
      }
    },
    removeMouseTool(){
      const vm = this
      if(vm.mouseTool){
        vm.mouseTool.remove()
        vm.mouseTool = null
      }
    }
  }
}
