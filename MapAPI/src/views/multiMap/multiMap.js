import * as KMap from '@/kmap/ol-map/KMap'
export default {
  name: 'apiUse',
  data() {
    return {
      imgUrl:require('@/kmap/api-resource/images/AMap/0.png')
    }
  },
  mounted() {
    this.createMap()
  },
  created() {
  },
  methods: {
    createMap() {
      const vm = this
      KMap.Common.ShowLevel = [3,22]
      KMap.Common.ShowToolbarControl = false
      window.map = new KMap.Map("map",8,113.27,23.45)
      vm.addMarker(114,23,this.map)
      vm.addPolyLine(this.map)
      vm.initMap2()
      vm.initMap3()
      vm.initMap4()
    },
    initMap2(){
      const vm = this
      KMap.Common.UseOnlineMap = true
      KMap.Common.ShowLevel = [3,22]
      KMap.Common.ShowToolbarControl = false
      window.map2 = new KMap.Map("map2",8,113.27,23.45)
      vm.addMarker(113,24,window.map2)
      vm.addPolygon(window.map2)
    },
    initMap3(){
      const vm = this
      KMap.Common.UseOnlineMap = true
      KMap.Common.ShowLevel = [3,22]
      KMap.Common.ShowToolbarControl = false
      window.map3 = new KMap.Map("map3",8,113.27,23.45)
      vm.addMarker(113.6,24.2,window.map3)
      vm.addPolyLine(window.map3)
    },
    initMap4(){
      const vm = this
      KMap.Common.UseOnlineMap = true
      KMap.Common.ShowLevel = [3,22]
      KMap.Common.ShowToolbarControl = false
      window.map4 = new KMap.Map("map4",8,113.27,23.45)
      vm.addMarker(113.5,24.3,window.map4)
      vm.addPolygon(window.map4)
    },
    //添加Marker
    addMarker(lng,lat,mapInstance){
      const marker = new KMap.Marker(lng,lat,this.imgUrl,-18,-36,36,36,null,mapInstance)
    },
    addPolygon(mapInstance){
      let vm = this
      let coordinate = [
        new KMap.LngLat(113.3,23.6),
        new KMap.LngLat(113.4,23.6),
        new KMap.LngLat(113.4,23.7),
        new KMap.LngLat(113.3,23.7),
        new KMap.LngLat(113.3,23.6)
      ]
      var style = {fillColor:"rgba(255,0,0,0.5)",strokeColor:"rgba(0,0,255,1)",storkeWidth:3}
      const polygon = new KMap.Polygon(coordinate,style,mapInstance)
    },
    addPolyLine(mapInstance){
      let vm = this
      let coordinate1 = "23.036682,113.064087;23.033875,113.062073;23.030884,113.059875;23.02771,113.058716;23.024109,113.057678;23.019897,113.057922;23.015076,113.057678;23.011108,113.056885;23.00708,113.055481;23.003296,113.052307;23.000916,113.05072;22.997681,113.048523;22.995117,113.047119;22.992126,113.046326;22.98468,113.045471;22.981873,113.045105;22.979919,113.045105;22.975891,113.044495;22.97168,113.042908;22.967896,113.041321;22.964111,113.039917;22.96051,113.03833;22.954285,113.037109;22.949707,113.036926;22.945496,113.037109;22.939514,113.037109;22.934082,113.037109;22.929077,113.037292;22.924927,113.037292;22.919922,113.037476;22.915527,113.037476;22.911926,113.037292;22.907898,113.036316;22.90271,113.033691;22.899719,113.032898;22.895874,113.031921;22.891907,113.031921;22.888916,113.032288;22.885315,113.032898;22.881714,113.033325;22.87793,113.034119;22.873291,113.034302;22.86853,113.033325;22.863892,113.032104;22.860291,113.030701;22.857117,113.02948"
      let coordinate2 = "22.854126,113.02832;22.850098,113.027527;22.847107,113.026917;22.843079,113.026672;22.838318,113.026123;22.835083,113.026306;22.831482,113.026123;22.827881,113.025696;22.823914,113.025879;22.820312,113.025696;22.816101,113.025879;22.810913,113.026123;22.806702,113.025879;22.803101,113.026306;22.797913,113.026489;22.792725,113.025879;22.788086,113.022522;22.780884,113.015686;22.775879,113.010681;22.772278,113.00708;22.768311,113.003723;22.763672,113.001892;22.759521,112.999512;22.755676,112.997681;22.749695,112.996704;22.745911,112.996094;22.741089,112.9953;22.736328,112.993286;22.731873,112.992126;22.727722,112.991272;22.723877,112.991089;22.71991,112.990723"
	    let coordinate3 = "22.715271,112.990295;22.71228,112.989319;22.709106,112.988281;22.705688,112.987488;22.701904,112.986877;22.698486,112.986084;22.694702,112.985474;22.690125,112.982483;22.686279,112.978516;22.683899,112.975098;22.681702,112.972473;22.678894,112.968872;22.676514,112.964905;22.675293,112.96051;22.673889,112.957886;22.672119,112.955078;22.670471,112.951294;22.669678,112.946899;22.668274,112.943726;22.666687,112.941101;22.665283,112.938477;22.663513,112.935303;22.661499,112.931885;22.659119,112.928711;22.656677,112.925293;22.653687,112.922119;22.651489,112.919678;22.648682,112.916504;22.646484,112.914307;22.642517,112.912476;22.638123,112.911682;22.634888,112.911316;22.631714,112.910889;22.627686,112.909729;22.623474,112.908691;22.61969,112.907471;22.616089,112.903931;22.612671,112.900513;22.609131,112.897888;22.605713,112.895325;22.601685,112.892517;22.598511,112.89032;22.595276,112.887878;22.591675,112.885315;22.589111,112.883301"
      let style1 = {color:"blue",width: 3}
      let style2 = {color:"red",width: 6}
      let style3 = {color:"#FF33DD",width: 4}
      vm.polyline1 = vm.createPolyLine(coordinate1,style1,mapInstance)
      vm.polyline2 = vm.createPolyLine(coordinate2,style2,mapInstance)
      vm.polyline3 = vm.createPolyLine(coordinate3,style3,mapInstance)
    },
    createPolyLine(coordinate,style,mapInstance){
      let lineArray =  new Array()
      let coordinates = coordinate.split(';')
      for(let i=0;i<coordinates.length;i++){
        let lnglats = coordinates[i].split(',')
          lineArray.push(new KMap.LngLat(lnglats[1], lnglats[0]))
      }
      let polyline = new KMap.Polyline(lineArray,style,mapInstance)
      return polyline
    }
  }
}
