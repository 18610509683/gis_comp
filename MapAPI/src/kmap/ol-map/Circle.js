import Feature from 'ol/Feature'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import Style from 'ol/style/Style'
import * as olExtent from 'ol/extent'
import * as proj from 'ol/proj'
import OLCircle from 'ol/geom/Circle'
import KBaseObject from './KBaseObject'
import Common from './Common'

/**
 * @description KMap.Circle 圆标记
 */
class Circle extends KBaseObject{
  /**
   * @description KMap.Circle 构造函数
   * @param {JSON Object} lng 必填 param.lat 必填 param
   */
  /**
   * Creates an instance of Circle.
   * @param {number} lng 经度 必填
   * @param {number} lat 纬度 必填
   * @param {number} radius 圆半径 必填
   * @param {JSON} param param.storkeWidth圆外线宽度 选填;
   * param.strokeColor圆外线颜色 选填;
   * param.background 圆背景颜色 选填。
   * @param {KMap.Map} [mapInstance=null] map对象，单地图的时候可不传，多地图时候需要传
   * @memberof Circle
   */
  constructor(lng,lat,radius,param,mapInstance = null){
    super(mapInstance)
    const vm = this
    Common.checkLngLat(lng,lat)
    vm.lng = lng
    vm.lat = lat
    vm.radius = radius
    //创建默认圆标记图层
    vm.source = vm.mapInstance.polygonLayer.getSource()
    //构造函数和对象参数
    vm.style = vm.initStyle(param)
    vm.circle = vm.initFeature()
    vm.circle.setStyle(vm.style)
    vm.source.addFeature(vm.circle)
  }
  /**
   * @description 初始化圆样式 供内部使用
   * @param {JSON} param param.storkeWidth圆外线宽度 选填;
   * param.strokeColor圆外线颜色 选填;
   * param.background 圆背景颜色 选填。
   * @return {Style} 
   * @memberof Circle
  */
  initStyle(param){
    const vm = this
    let background = (param != undefined && param.background != undefined )? param.background : "rgba(255,0,0,.5)"
    let strokeWidth = (param != undefined && param.strokeWidth != undefined )? param.strokeWidth : 1
    let strokeColor = (param != undefined && param.strokeColor != undefined )? param.strokeColor : "rgba(255,0,0,0)"
    let style = new Style({
      fill: new Fill({ //矢量图层填充颜色，以及透明度
        color: background
      }),
      stroke: new Stroke({ //边界样式
        color: strokeColor,
        width: strokeWidth
      })
    })
    return style
  }
  
  /**
   * @description 初始化Feature 内部函数
   * @return {Feature} 
   * @memberof Circle
   */
  initFeature(){
    const vm = this
    vm.center = proj.fromLonLat([vm.lng,vm.lat])
    var circle = new OLCircle(vm.center, vm.radius,'XY')
    let feature = new Feature({
      geometry: circle
    })
    return feature
  }
  
  /**
   * @description 修改半径
   * @param {number} newRadius 新的半径值
   * @memberof Circle
   */
  setRadius(newRadius) {
    const vm = this
    vm.radius = newRadius
    vm.circle.getGeometry().setRadius(newRadius)
	}
	
  /**
  * @description 显示圆标记
  * @memberof Circle
  */
  show() {
    const vm = this
    if(!vm.source.hasFeature(vm.circle)){
      vm.source.addFeature(vm.circle)
    }
	}

	/**
   * @description 隐藏圆标记
   * @memberof Circle
   */
  hide() {
    const vm = this
    if(vm.source.hasFeature(vm.circle)){
      vm.source.removeFeature(vm.circle)
    }
	}
  
	/**
   * @description 删除圆标记
   * @memberof Circle
   */
  remove() {
    const vm = this
    if(vm.source.hasFeature(vm.circle)){
      vm.source.removeFeature(vm.circle)
    }
	}
  
  /**
	 * 地图视角缩放到圆标记范围
	 * @param duration 动画持续时间(单位:毫秒) 选填，默认0毫秒
	 */
	zoomToExtent(duration) {
    const vm = this
		duration = (duration)? duration : 0
    let extentBound = vm.circle.getGeometry().extent_
		vm.map.getView().fit(extentBound,{
			duration: duration
		})
	}
}

export default Circle