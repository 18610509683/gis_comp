import * as KMap from '@/kmap/ol-map/KMap'
export default {
  name: 'apiUse',
  data() {
    return {
      imgUrl:require('@/kmap/api-resource/images/AMap/back-to-origin.png'),
    }
  },
  mounted() {
    this.createMap()
  },
  created() {
  },
  methods: {
    createMap() {
      //百度底图
      // KMap.Common.UseBaiDuOnlineLayer = true;
      // KMap.Common.ShowLevel = [1,21];
      // KMap.Common.ShowToolbarControl = false;
      // KMap.Common.BaseLayerZoom = [1,17]
      // window.map = new KMap.Map("map",18,117.82289663837429, 32.00807378485615);
      // var url = "http://47.107.126.107:9000/map/hefei/{z}/{x}/{y}.png"
      // this.layer = new KMap.BaiDuLayer(url,{minZoom:17,maxZoom:21})
      //高德底图
      KMap.Common.UseGaoDeOnlineLayer = true;
      KMap.Common.ShowLevel = [1,15];
      KMap.Common.ShowToolbarControl = false;
      KMap.Common.BaseLayerZoom = [1,12]
      window.map = new KMap.Map("map",12.5,112.94727016872979, 23.251663492002535);
      var url = "http://47.107.126.107:9000/map/foshan/{z}/{y}/{x}.png"
      this.layer = new KMap.XYZLayer(url,{minZoom:12,maxZoom:15})
    },
    draw(geoType){
      const vm = this
      if(vm.drawTool){
        vm.drawTool.destory()
        vm.drawTool = null
      }
      vm.drawTool = new KMap.Draw(geoType)
      debugger;
      vm.drawTool.drawEnd(function(data){
        console.log(data)
        if(data.type == 'Point'){
          vm.addMarker(data.coordinates)
        }
        if(data.type == 'LineString'){
          vm.addPolyLine(data.coordinates)
        }
        if(data.type == 'Polygon'){
          vm.addPolygon(data.coordinates)
        }
      })
      
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
    },
    //添加Marker
    addMarker(coordinate){
      let lng = coordinate[0];
      let lat = coordinate[1];
      let marker = new KMap.Marker(lng,lat,this.imgUrl,-12,-12,24,24)
    },
    //添加线
    addPolyLine(coordinates){
      var style = {color:"blue",width: 3}
      var lineArray = [];
      for(let i=0;i<coordinates.length;i++){
          let lnglats = coordinates[i];
          lineArray.push(new KMap.LngLat(lnglats[0], lnglats[1]))
      }
      let polyline = new KMap.Polyline(lineArray,style)
      return polyline
    },
    //添加面
    addPolygon(coordinates){
      let vm = this
      let newcoordinate = [];
      coordinates.forEach(function(item){
        newcoordinate.push(new KMap.LngLat(item[0],item[1]));
      })
      var style = {fillColor:"rgba(255,0,0,0.5)",strokeColor:"rgba(0,0,255,1)",storkeWidth:3}
      vm.polygon = new KMap.Polygon(newcoordinate,style)
    },
    //清空 --用户的点线面
    clearUserAdd(){
      window.map.clearMap();
    }
  }
}
