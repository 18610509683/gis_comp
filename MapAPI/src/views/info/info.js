import * as KMap from '@/kmap/ol-map/KMap'
import { getCenter } from 'ol/extent'
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
    //获取中心点击层级
    getCenterAndZoom(){
      if(window.map){
        var center = window.map.getCenter();
        var zoom = window.map.getZoom();
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
    },
    //设置中心点和层级
    setZoomAndCenter(){
      if(window.map){
        window.map.setZoomAndCenter(13,new KMap.LngLat(113,23),true)
      }
    },
    //获取中心点经纬度
    getCenter(){
      if(window.map){
        var center = window.map.getCenter()
        alert("中心点坐标为经度为:"+center.getLng()+",纬度为:"+center.getLat())
      }
      
    },
    //获取层级
    getZoom(){
      if(window.map){
        let zoom = window.map.getZoom()
        alert("层级Zoom为"+zoom)
      }
    }
  }
}
