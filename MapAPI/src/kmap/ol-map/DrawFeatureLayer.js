import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import Style from 'ol/style/Style'
import Common from './Common'
import Icon from 'ol/style/Icon'
import defaultUrl from '../api-resource/images/AMap/0.png'
import KBaseObject from './KBaseObject'
/**
 * @description KMap.DrawFeatureLayer 画图样式控制类
 */
class DrawFeatureLayer extends KBaseObject{
  /**
   * Creates an instance of DrawFeatureLayer.
   * @param {ol.layer} layer
   * @param {KMap.Map} [mapInstance=null] map对象，单地图的时候可不传，多地图时候需要传
   * @memberof DrawFeatureLayer
   */
  constructor(layer,mapInstance = null){
    super(mapInstance)
    const vm = this
    vm.layer = layer
    vm.source = vm.layer.getSource()
    vm.style = {
      "pointStyle":{
          width:36,
          height:36,
          offsetX:0.5,
          offsetY:1
      },
      "lineStyle":{
          "strokeColor":"red",
          "strokeWidth":3,
          "color":"red"
      },
      "polygonStyle":{
          fillColor:'rgba(255,0,0,0.5)',
          strokeColor:'rgba(255,0,0,1)',
          strokeWidth:2
      }
    }
  }
  /**
   * @description 初始化样式
   * @memberof DrawFeatureLayer
   */
  initStyle(){
    const vm = this
    //默认线样式
    var defLineStyle = {
      color: "red",
      width: 3,
      lineCap: "round"
    }

    vm.lineStyle = vm.style.lineStyle!=undefined?vm.style.lineStyle:null
    //需增加兼容老版本的代码
    if(vm.lineStyle != undefined
      && vm.lineStyle.strokeColor != undefined){
      defLineStyle.color = vm.lineStyle.strokeColor
    }

    if(vm.lineStyle != undefined
      && vm.lineStyle.strokeWidth != undefined){
      defLineStyle.width = vm.lineStyle.strokeWidth
    }
    vm.lineStyle = ( vm.lineStyle != undefined ) ? Common.extend(defLineStyle,vm.lineStyle,true) : defLineStyle
  }
  /**
  *读取Features
  */
	readFeatures(features){
    const vm = this
		//面样式
		let polygonStyle = vm.style.polygonStyle
		let fillColor = (polygonStyle!=undefined && polygonStyle.fillColor)?polygonStyle.fillColor:'rgba(255,0,0,0.5)'
		let strokeColor = (polygonStyle!=undefined && polygonStyle.strokeColor)?polygonStyle.strokeColor:'rgba(255,0,0,1)'
		let strokeWidth = (polygonStyle!=undefined && polygonStyle.strokeWidth)?polygonStyle.strokeWidth:1
		let fill = new Fill({
			color: fillColor
		})

		let stroke = new Stroke({
			color: strokeColor,
			width: strokeWidth
		})

		let pyStyle= new Style({
			fill: fill,
			stroke: stroke
		})

		//线标记初始样式
		let defaultStyle = new Style({
			stroke: new Stroke(vm.lineStyle),
			zIndex: 0
		})

		//点样式
		let pointStyle = vm.style.pointStyle
		let url = (pointStyle.url != undefined)? pointStyle.url : defaultUrl
		let width = (pointStyle.width != undefined)? pointStyle.width : 36
		let height = (pointStyle.height != undefined)? pointStyle.height : 36
		let offsetX = (pointStyle.offsetX != undefined)? -(pointStyle.offsetX/width) : 0.5
		let offsetY = (pointStyle.offsetY != undefined)? -(pointStyle.offsetY/height) : 1
		pointStyle = new Style({
			image: new Icon({
				src: url,
				anchor: [offsetX,offsetY] //点标记偏移
			}),
			zIndex: 0
		})
		features.forEach(function(feature){
			let item = new format.WKT().readFeature(feature,{
				featureProjection:"EPSG:3857",
				dataProjection:"EPSG:4326"
			})
			let type = item.getGeometry().getType()

			if(type == "Point"){
				item.setStyle(pointStyle)
			}

			if(type == "Polygon"){
				item.setStyle(pyStyle)
			}

			if(type == "LineString"){
				item.setStyle(defaultStyle)
			}
			vm.source.addFeature(item)
		})
	}

  /**
    * @description 清空
    * @memberof DrawFeatureLayer
  */
  clear(){
    if(vm.layer != undefined){
      vm.source.clear()
    }
  }

  /**
    * @description 删除
    * @memberof DrawFeatureLayer
  */
  remove(){
    const vm = this
		if(vm.layer){
			vm.map.removeLayer(vm.layer)
		}
	}
}

export default DrawFeatureLayer