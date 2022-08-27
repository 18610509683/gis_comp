import * as LTMap from '@/kmap/ol-map/LTMap'
export default {
  name: 'marke',
  data() {
    return {
      imgUrl:require('../../kmap/api-resource/images/AMap/0.png'),
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
        LTMap.Common.UseOnlineMap = true
        // LTMap.Common.UseSimpleMap = true
        LTMap.Common.ShowLevel = [3,22]
        LTMap.Common.ShowToolbarControl = false
        debugger
        window.map = new LTMap.Map("map",8,113.27,23.45)
    },
    //添加Marker
    addMarker(){
      if(this.marker){
        this.marker.remove()
        this.marker = null
      }
      let lng = 113
      let lat = 23
      this.marker = new LTMap.Marker(lng,lat,this.imgUrl,-18,-36,36,36)
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
      this.marker = new LTMap.Marker(lng,lat,this.imgUrl,-18,-36,36,36)
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
      this.marker = new LTMap.Marker(lng,lat,this.imgUrl,-18,-36,36,36)
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
      vm.infoWindow = new LTMap.InfoWindow({
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
      vm.infoWindow = new LTMap.InfoWindow({
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
        text:"高进度地图引擎",
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