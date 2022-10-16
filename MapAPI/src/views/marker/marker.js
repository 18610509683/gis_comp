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
    //使用自定义图层---并不是默认的图层
    let layer = new KMap.VectorLayer('marker2',KMap.Common.MarkerLayerZIndex,{minxZoom:4,maxZoom:16})
    window.source1 = layer.source
  },
  created() {
  },
  methods: {
    createMap() {
        KMap.Common.ShowLevel = [3,22]
        KMap.Common.ShowToolbarControl = false
        window.map = new KMap.Map("map",8,113, 23)
        var url = "http://47.107.126.107:9000/map/hefei/{z}/{x}/{y}.png"
        this.layer = new KMap.BaiDuLayer(url,{minZoom:17,maxZoom:21})
    },
    //添加Marker
    addMarker(){
      if(this.marker){
        this.marker.remove()
        this.marker = null
      }
      let lng = 113
      let lat = 23
      this.marker = new KMap.Marker(lng,lat,this.imgUrl,-18,-36,36,36,{source:window.source1})
    },
    //移除Marker
    removeMarker(){
      if(this.marker){
        this.marker.remove()
        this.marker = null
      }
    },
    //添加contentDOM
    addContentDOM(){
      if(this.marker){
        this.marker.remove()
        this.marker = null
      }
      let lng = 113
      let lat = 23
      this.marker = new KMap.Marker(lng,lat,this.imgUrl,-18,-36,36,36)
      let div = document.createElement('div')
      div.innerHTML = '<img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">'
      this.marker.setContentChangeAbleWidth(div,-35)
    },
    //添加contentDOM1
    addContentDOM1(){
      if(this.marker){
        this.marker.remove()
        this.marker = null
      }
      let lng = 113
      let lat = 23
      this.marker = new KMap.Marker(lng,lat,this.imgUrl,-18,-36,36,36)
      let div = document.createElement('div')
      div.innerHTML = '<img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">'
      this.marker.setContent(div,-118,-260)
    },
    //显示content
    showContent(){
      if(this.marker){
        this.marker.showContent()
      }
    },
    //隐藏content
    hideContent(){
      if(this.marker){
        this.marker.hideContent()
      }
    },
    //点击弹窗
    openWindow(){
      const vm = this
      if(vm.infoWindow){
        vm.infoWindow.close()
      }
      if(vm.marker){
        vm.marker.remove()
      }
      vm.addMarker()
      let lnglat = vm.marker.getPosition()
      // console.log(card)
      // console.log(vm.$refs.infoWindow)
      // vm.infoWindowShow = true
      let content = document.createElement("div")
      content.innerHTML = '<div>'
        +'<span>弹窗信息窗口</span>'
      +'</div>'
      content.classList.add("infoBox")
      vm.infoWindow = new KMap.InfoWindow({
        content:content,
        position:lnglat,
        type:"click",
        // offsetX:-150,
        offsetY:-40
      })
      vm.marker.on('click',function(){
        vm.infoWindow.open()
      })
    },
    //鼠标移动弹窗
    mouseWindow(){
      const vm = this
      if(vm.infoWindow){
        vm.infoWindow.close()
      }
      if(vm.marker){
        vm.marker.remove()
      }
      vm.addMarker()
      let lnglat = vm.marker.getPosition()
      // console.log(card)
      // console.log(vm.$refs.infoWindow)
      // vm.infoWindowShow = true
      let content = document.createElement("div")
      content.innerHTML = '<div>'
        +'<span>弹窗信息窗口</span>'
      +'</div>'
      content.classList.add("infoBox")
      vm.infoWindow = new KMap.InfoWindow({
        content:content,
        position:lnglat,
        type:"mousemove",
        // offsetX:-150,
        offsetY:-40
      })
      vm.marker.on('mousemove',function(){
        vm.infoWindow.open()
      })
    },
    //设置文字
    markerText(){
      const vm = this
      if(vm.infoWindow){
        vm.infoWindow.close()
      }
      if(vm.marker){
        vm.marker.remove()
      }
      vm.addMarker()
      vm.marker.setText({
        text:"高精度地图引擎",
        fill:"red",
        backgroundColor:"silver",
        backgroundStroke:"thistle",
        padding:[2,5,2,5]
      })
    },
    //关闭弹窗
    closeWindow(){
      if(this.infoWindow){
        this.infoWindow.close()
      }
    }
  }
}
