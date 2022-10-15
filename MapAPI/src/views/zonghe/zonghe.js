import * as KMap from '@/kmap/ol-map/KMap'
export default {
  name: 'marke',
  data() {
    return {
      imgUrl:require('@/kmap/api-resource/images/AMap/0.png'),
      marker:null,
      infoWindowShow:false,
      text:"开启拾取模式",
      isShiQu:false,
    }
  },
  mounted() {
    this.createMap()
  },
  created() {
  },
  methods: {
    createMap() {
        //KMap.Common.UseWGS84OnlineLayer = true
        KMap.Common.UseBaiDuOnlineLayer = true
        KMap.Common.ShowLevel = [3,16]
        KMap.Common.ShowToolbarControl = false
        window.map = new KMap.Map("map",8,113.27,23.45)
    },
    //高德离线
    addGaoDeOffline(){
      if(window.map){
        window.map.destroy();
        window.map = null;
      }
      KMap.Common.UseGaoDeOnlineLayer = true;
      KMap.Common.ShowLevel = [1,15];
      KMap.Common.ShowToolbarControl = false;
      KMap.Common.BaseLayerZoom = [1,12]
      window.map = new KMap.Map("map",12.5,112.94727016872979, 23.251663492002535);
      var url = "http://47.107.126.107:9000/map/foshan/{z}/{y}/{x}.png"
      this.layer = new KMap.XYZLayer(url,{minZoom:12,maxZoom:15})
    },
    //百度离线
    addBaiduOffline(){
      if(window.map){
        window.map.destroy();
        window.map = null;
      }
      KMap.Common.UseBaiDuOnlineLayer = true;
      KMap.Common.ShowLevel = [1,21];
      KMap.Common.ShowToolbarControl = false;
      KMap.Common.BaseLayerZoom = [1,17]
      window.map = new KMap.Map("map",17,117.82289663837429, 32.00807378485615);
      var url = "http://47.107.126.107:9000/map/hefei/{z}/{x}/{y}.png"
      this.layer = new KMap.BaiDuLayer(url,{minZoom:17,maxZoom:21})
    },
    //WGS84 wmts 离线
    addWGS84Offline(){
      if(window.map){
        window.map.destroy();
        window.map = null;
      }
      KMap.Common.UseWGS84OnlineLayer = true;
      KMap.Common.ShowLevel = [1,25];
      KMap.Common.BaseLayerZoom = [1,16];
      KMap.Common.ShowToolbarControl = false;
      window.map = new KMap.Map("map",8,113.27,23.45);
      let url = "http://192.168.16.120:8080/geoserver/gwc/service/wmts";
      var layerName = 'test:reservoir';
      this.layer = new KMap.WMTSLayer(url,{layerName:layerName,minZoom:16,maxZoom:25})
      window.map.setZoomAndCenter(18,new KMap.LngLat(117.81064408342074, 32.19214643804327));
      
    },
    //获取中心点击层级
    getCenterAndZoom(){
      if(window.map){
        var center = window.map.getCenter();
        var zoom = window.map.getZoom();
        debugger;
        alert("中心点坐标为经度为:"+center.getLng()+",纬度为:"+center.getLat()+";层级Zoom为"+zoom)
      }
    },
    //开启拾取坐标模式
    GetCoordinates(){
      const vm = this;
      vm.isShiQu = !vm.isShiQu;
      if(vm.isShiQu){
        vm.text = "关闭拾取模式"
      }else{
        vm.text = "开启拾取模式"
      }
     
      window.map.on('click',function(e){
        if(vm.isShiQu){
          let coordinate = KMap.Common.toWGS84LngLat(window.map,e.coordinate);
          alert("点击坐标为经度为:"+coordinate[0]+",纬度为:"+coordinate[1])
        }
      })
    }
  }
}
