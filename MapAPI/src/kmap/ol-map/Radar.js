import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import Style from 'ol/style/Style'
import Circle from 'ol/style/Circle'
import Fill from 'ol/style/Fill'
import * as proj from 'ol/proj'
import KBaseObject from './KBaseObject'
import Common from './Common'
/**
 * @description KMap.Radar 雷达效果类
*/
class Radar extends KBaseObject{
  /**
   * @param {*} params
   * @param {KMap.Map} [mapInstance=null] map对象，单地图的时候可不传，多地图时候需要传
   * @memberof Radar
   */
  constructor(params,mapInstance = null){
    super(mapInstance)
		const vm = this
    vm.source = vm.mapInstance.markerLayer.getSource()
    //地图点标记图层
    if(params != null){
      Common.checkLngLat(params.lng,params.lat)
    }
    let lng = (params != undefined && params.lng != undefined)? params.lng : null
    let lat = (params != undefined && params.lat != undefined)? params.lat : null
    if(lng == null || lat == null) return

    vm.radius = (params != undefined && params.radius)? params.radius : 50
    vm.color = (params != undefined && params.color != undefined)? params.color : "rgba(0,255,0,0.5)"
    vm.point = vm.createPoint(vm.radius,vm.color,[lng,lat])
    vm.interval()
  }
  //添加纯圆点标记
  createPoint(radius,color,coordinate) {
    const vm = this
    let point = new Feature({
      geometry:new Point(proj.fromLonLat(coordinate))
    })
    let style = new Style({
      image: new Circle({
        radius: radius,
        fill: new Fill({
          color: color
        })
      })
    })
    point.setStyle(style)
    vm.source.addFeature(point)
    return point
  }
  changeRadius(radarPoint,startRadius){
    const vm = this
    //获取点样式
    let radarStyle = radarPoint.getStyle()
    //获取点半径
    let radarRadius = radarStyle.getImage().radius_
    if(radarRadius >= vm.radius){
      radarRadius = vm.radius*0.3
    }
    else{
      radarRadius += 0.1
    }
    //设置样式点半径
    radarStyle.getImage().setRadius(radarRadius)
    //雷达标记修改为最新样式
    radarPoint.setStyle(radarStyle)
  }
  interval(){
    const vm = this
    setInterval(function(){
    	vm.changeRadius(vm.point)
    },5)
  }
}
export default Radar