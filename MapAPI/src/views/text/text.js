import * as KMap from '@/kmap/ol-map/KMap'
export default {
  name: 'text',
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
      KMap.Common.UseGaoDeOnlineLayer = true;
      KMap.Common.ShowLevel = [1,15];
      KMap.Common.ShowToolbarControl = false;
      KMap.Common.BaseLayerZoom = [1,12]
      window.map = new KMap.Map("map",8,112.94727016872979, 23.251663492002535);
      var url = "http://47.107.126.107:9000/map/foshan/{z}/{y}/{x}.png"
      this.layer = new KMap.XYZLayer(url,{minZoom:12,maxZoom:15})
    },
    addLabel(){
      const vm = this
      if(vm.label == null){
        //创建文本标记
        vm.label = new KMap.Label({
          lng: 113,
          lat: 24,
          text: "利通科技投资有限公司",
          font: "16px",
          fill: "red",
          backgroundColor: "#fff",
          backgroundStroke: "black"
        })
        //创建文本标记
        vm.label1 = new KMap.Label({
          lng: 113.1,
          lat: 24.2,
          text: "广东省清远市",
          font: "32px",
          fill: "green",
          backgroundColor: "#fff",
          backgroundStroke: "black"
        })
      }
    }
  }
}
