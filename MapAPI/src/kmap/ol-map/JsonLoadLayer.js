import VectorSource from 'ol/source/Vector'
import KBaseObject from './KBaseObject'
import VectorLayer from 'ol/layer/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import Style from 'ol/style/Style'
import Stroke from 'ol/style/Stroke'
import {boundingExtent} from 'ol/extent'
import Common from './Common'
import InfoWindow from './InfoWindow'
import LngLat from './LngLat'
import { transform } from 'ol/proj'
import Fill from 'ol/style/Fill'
class JsonLoadLayer extends KBaseObject{
  constructor(geojson,options,mapInstance = null){
    super(mapInstance)
    const vm = this
    const projection = options&&options.projection?options.projection:"EPSG:4326"
    if(geojson){
      vm.features = new GeoJSON().readFeatures(geojson,{dataProjection:projection,featureProjection:"EPSG:3857"})
      vm.features.forEach(function(feature,index){
        feature.values_.index = index
      })
    }else{
      vm.features = []
    }
    
    vm.source = new VectorSource({
      features: vm.features
    })

    const style = new Style({
      stroke: new Stroke({
        color: '#007aff',
        width: 4,
      }),
      fill:new Fill({
        color:'rgba(241,242,236,0.8)',
      })
    })
    const flashStyle = new Style({
      stroke: new Stroke({
        color: '#00ffff',
        width: 5,
        zIndex:999,
        fill:new Fill({
          color:'rgba(241,242,236,0.8)',
        })
      }),
    })
    vm.style = style
    vm.flashStyle = flashStyle
    vm.id = "JsonLoadLayer"+ Common.createUUID()
    vm.layer = new VectorLayer({
      source:vm.source,
      style:style,
      name:"JsonLoadLayer"+ vm.id
    })

    vm.map.addLayer(vm.layer)
  }
  addArr(indexs){
    const vm = this
    let arr = indexs.split(",")
    arr.forEach(function(item){
      vm.addOne(item)
    })
  }
  panTo(indexs){
    const vm = this
    let arr = indexs.split(",")
    let features = []
    arr.forEach(function(index){
      features.push(vm.features[index])
    })
    var extents = features
    .map(function (f) { return f.getGeometry().getExtent() })
    let extent = []
    extent = extents[0]
    for(let i = 1;i<extents.length;i++){
      let subExtent = extents[i]
      if(subExtent[0]<extent[0]){
        extent[0] = subExtent[0]
      }
      if(subExtent[1]<extent[1]){
        extent[1] = subExtent[1]
      }
      if(subExtent[2]>extent[2]){
        extent[2] = subExtent[2]
      }
      if(subExtent[3]>extent[3]){
        extent[3] = subExtent[3]
      }
    }
    vm.map.getView().fit(extent, vm.map.getSize())
  }
  addOne(index){
    const vm = this
    vm.source.addFeature(vm.features[index])
  }
  addNewOne(feature){
    const vm = this
    feature.setStyle(vm.flashStyle)
    vm.source.clear()
    vm.source.addFeature(feature)
  }
  removeOne(index){
    const vm = this
    vm.source.removeFeature(vm.features[index])
  }
  removeAll(){
    const vm = this
    vm.source.clear()
    if(vm.flashFeature){
      vm.flashFeature = null
    }
  }
  getFeatureInfo(){
    const vm = this
    let list = []
    for(var i=0;i<vm.features.length;i++){
      const feature = vm.features[i]
      list.push(feature.values_)
    }
    return list
  }
  flashFeatureHandle(index){
    const vm = this
    vm.source.getFeatures().forEach(function(feature){
      if(feature.values_.index == index){
        feature.setStyle(vm.flashStyle)
        if(vm.flashFeature){
          vm.flashFeature.setStyle(vm.style)
        }
        vm.flashFeature = feature
      }
    })
  }
  removeFlashFeature(){
    const vm = this
    if(vm.flashFeature){
      vm.flashFeature.setStyle(vm.style)
    }
  }
  infoWindow(key){
    const vm = this
    vm.key = key
    let content = document.createElement("div")
    content.innerHTML = '<div >'+
    '<table class="reference">'+
      '<tbody class="infowindow-pop">'+
        '<tr>'+
          '<th>属性名称</th>'+
          '<th>属性值</th>'+
        '</tr>'+
      '</tbody>'+
    '</table>'+
    '</div>'
    content.classList.add("infoBox")
    vm.infoWindow = new InfoWindow({
      content:content,
      position:[],
      type:"click",
      // offsetX:-200,
      offsetY:-5
    })
    vm.map.on('click',function(event){
      let pixel = event.pixel
      var features = vm.map.getFeaturesAtPixel(pixel, {
        layerFilter:function(layer){
          return layer == vm.layer
        }
      })
      let coordinate = event.coordinate
      let feature = features[0]
      if(feature){
        if(vm.flashFeature){
          vm.flashFeature.setStyle(vm.style)
        }
        feature.setStyle(vm.flashStyle)
        vm.flashFeature = feature
        vm.infoWindowOpen(coordinate,feature)
      }
    })
  }
  infoWindowOpen(coordinate,feature){
    debugger
    const vm = this
    const key = vm.key
    let lnglat = transform(coordinate,"EPSG:3857","EPSG:4326")
    let position = new LngLat(lnglat[0],lnglat[1])
    vm.infoWindow.setPosition(position)
    let dom = vm.converData(key,feature)
    vm.infoWindow.setContent(dom)
    vm.infoWindow.open()
  }
  converData(key,feature){
    const vm = this
    var obj = feature.values_
    var html = ''
    debugger
    for(let i = 0;i<key.length;i++){
      let item = key[i]
      let label = item.label
      let cnName = item.cnName
      var value = obj[label]
      var node = document.createElement('tr')
      node.innerHTML ='<td>'+cnName+'</td>'+
      '<td>'+value+'</td>'
      html += node.outerHTML
    }
    let dom = document.createElement("div")
    dom.classList.add("infoBox")
    dom.innerHTML = '<div style="background-color: #ffffff">'+
    '<div style="text-align: center">属性信息</div>'+
    '<table class="reference">'+
    '<tbody class="infowindow-pop">'+
    '<tr>'+
      '<th>属性名称</th>'+
      '<th>属性值</th>'+
    html+
    '</tr>'+
    '</tbody>'
    '</table>'+
    '</div>'
    return dom
  }
}
export default JsonLoadLayer