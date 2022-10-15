import OLPolygon from 'ol/geom/Polygon'
import Feature from 'ol/Feature'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import Style from 'ol/style/Style'
import * as proj from 'ol/proj'
import * as olExtent from 'ol/extent'
import KBaseObject from './KBaseObject'
/**
 * @description KMap.Polygon 面标记类
*/
class Polygon extends KBaseObject{
  /**
   * @param {*} positions
   * @param {*} style
   * @param {KMap.Map} [mapInstance=null] map对象，单地图的时候可不传，多地图时候需要传
   * @memberof Polygon
   */
  constructor(positions,style,options,mapInstance = null){
    super(mapInstance)
		const vm = this
    const layer = vm.mapInstance.polygonLayer
    vm.source = layer.getSource()
    if(options && options.source){
      vm.source = source;
    }
    vm.style = vm.initStyle(style)
    vm.polygon = vm.initFeature(positions,vm.style)
    vm.source.addFeature(vm.polygon)
  }
  initStyle(style){
    let fillColor = (style!=undefined && style.fillColor)?style.fillColor:'rgba(255,0,0,0.5)'
    let strokeColor = (style!=undefined && style.strokeColor)?style.strokeColor:'rgba(255,0,0,1)'
    let strokeWidth = (style!=undefined && style.strokeWidth)?style.strokeWidth:1
    let fill = new Fill({
      color: fillColor
    })
    let stroke = new Stroke({
      color: strokeColor,
      width: strokeWidth
    })
    let newStyle= new Style({
      fill: fill,
      stroke: stroke
    })
    return newStyle
  }
  initFeature(positions,style){
    let newPositions = []
    positions.forEach(function(position){
      newPositions.push([position.getLng(),position.getLat()])
    })
    let geometry = new OLPolygon([newPositions])
    geometry.applyTransform(proj.getTransform('EPSG:4326', 'EPSG:3857'))
    //创建面标记
    let polygon = new Feature({geometry:geometry})
    polygon.setStyle(style)
    return polygon
  }

  /**
	 * 地图视角缩放到线标记范围
	 * @param duration 动画持续时间(单位:毫秒) 选填，默认0毫秒
	 */
	zoomToExtent(duration) {
    const vm = this
		duration = (duration)? duration : 0
		let extent = vm.polygon.getGeometry().getExtent()
		// let extentBound = olExtent.boundingExtent(LonLatArray)
		vm.map.getView().fit(extent,{
			duration: duration
		})
	}

  /**
   * @description 显示
   * @memberof Polygon
   */
  show(){
    const vm = this
		if(!vm.source.hasFeature(vm.polygon)) {
			vm.source.addFeature(vm.polygon)
		}
  }

  /**
   * @description 隐藏
   * @memberof Polygon
   */
  hide(){
    const vm = this
		if(vm.source.hasFeature(vm.polygon)) {
			vm.source.removeFeature(vm.polygon)
		}
  }
  /**
   * @description 移除
   * @memberof Polygon
   */
  remove(){
    const vm = this
		if(vm.source.hasFeature(vm.polygon)) {
			vm.source.removeFeature(vm.polygon)
		}
  }
}
export default Polygon