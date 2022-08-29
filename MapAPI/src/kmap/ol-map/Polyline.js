import Common from './Common'
import Style from 'ol/style/Style'
import Stroke from 'ol/style/Stroke'
import * as olExtent from 'ol/extent'
import * as proj from 'ol/proj'
import InfoWindow from './InfoWindow'
import LngLat from './LngLat'
import Feature from 'ol/Feature'
import LineString from 'ol/geom/LineString'
import KBaseObject from './KBaseObject'
/**
 * @description KMap.Polyline 线标记类
*/
class Polyline extends KBaseObject{
	/**
	 * @param {*} points
	 * @param {*} style
	 * @param {*} extData
	 * @param {KMap.Map} [mapInstance=null] map对象，单地图的时候可不传，多地图时候需要传
	 * @memberof Polyline
	 */
	constructor(points,style,extData,mapInstance = null) {
    super(mapInstance)
		//地图map对象
    const vm = this
    //地图线标记图层
    vm.source = vm.mapInstance.polyLineLayer.getSource()
    extData = (extData)? extData : null

    let point_Array = new Array()
    for(let i=0; i<points.length; i++) {
      let point = Common.KMapLngLat2MapLngLat(points[i])
      point_Array.push(proj.fromLonLat(point))
    }
    
    //创建线标记
    let polyline = new Feature({
      geometry: new LineString(point_Array),
      properties: extData
    })
    vm.style = vm.initStyle(style)
    polyline.setStyle(vm.style)

    //线标记添加到地图图层
    vm.source.addFeature(polyline)

    //获取线标记
    vm.polyline = polyline
    vm.pointmoveFeature =null
  }
  initStyle(style){
    //默认线路样式
    let defStyle = {
      color: "red",
      width: 3,
      lineCap: "round"
    }
    //需增加兼容老版本的代码
    if(style != undefined && style.strokeColor != undefined){
      defStyle.color = style.strokeColor
    }
    if(style != undefined && style.strokeWidth != undefined){
      defStyle.width = style.strokeWidth
    }
    style = ( style != undefined ) ? Common.extend(defStyle,style,true) : defStyle
    //设置线标记初始样式
    let defaultStyle = new Style({
      stroke: new Stroke(style),
      zIndex: 0
    })
    return defaultStyle
  }

	/**
	 * 获取id
	 * @returns id
	 */
	getId() {
    const vm = this
		let id = vm.polyline.getId()
		return id
	}

	/**
	 * 设置id
	 * @param id 线标记id值(尽量添加前缀不要纯数字)，必填
	 */
	setId(id) {
    const vm = this
		vm.polyline.setId(id)
	}

	/**
	 * 设置线标记样式
	 * @param param JSON对象，线样式配置，选填，为空时使用默认配置
	 * param.color 线颜色，选填，默认red
	 * param.width 线宽度 选填，默认3
	 * param.lineCap 线帽样式("butt"对接,"round"圆形,"square"方形) 选填，默认round
	 */
	setStyle(param) {
    const vm = this
		let color = (param != undefined && param.color != undefined )? param.color : "red"
		let width = (param != undefined && param.width != undefined )? param.width : 3
		let lineCap = (param != undefined && param.lineCap != undefined )? param.lineCap : "round"
		let style = new Style({
			stroke: new Stroke({
				color: color,
				width: width,
				lineCap: lineCap
			}),
			zIndex: 0
		})
		vm.polyline.setStyle(style)
	}

	/**
	 * 获取线标记端点坐标数组
	 * @returns KMap.LngLat格式的经纬度数组集合
	 */
	getCoordinates() {
    const vm = this
		let points = []
		let coordinates = vm.polyline.getGeometry().getCoordinates()
		for(let i = 0 ; i < coordinates.length ; i ++)
		{
			let coordinate =  proj.toLonLat(coordinates[i]) //平面坐标转经纬度坐标
			coordinate = Common.MapLngLat2KMapLngLat(coordinate)//Openlayers经纬度坐标转利通地图经纬度坐标
			points.push(coordinate)
		}
		return points
	}

	/**
	 * 显示线标记
	 */
	show() {
    const vm = this
		if(!vm.source.hasFeature(vm.polyline)) {
			vm.source.addFeature(vm.polyline)
		}
	}

	/**
	 * 隐藏线标记
	 */
	hide() {
    const vm = this
		if(vm.source.hasFeature(vm.polyline)) {
			vm.source.removeFeature(vm.polyline)
		}
	}

	/**
	 * 删除线标记
	 */
	remove() {
    const vm = this
		if(vm.source.hasFeature(vm.polyline)) {
			vm.source.removeFeature(vm.polyline)
		}
	}

	/**
	 * 获取线标记叠加顺序
	 * @param 线标记叠加顺序
	 */
	getZIndex() {
    const vm = this
		let index = vm.polyline.getStyle().getZIndex()
		return index
	}

	/**
	 * 设置线标记叠加顺序
	 * @param index index值大的显示在上方,值相同时后加载的标记显示在上方，必填
	 */
	setZIndex(index) {
    const vm = this
		vm.polyline.getStyle().setZIndex(index)
	}

	/**
	 * 地图视角缩放到线标记范围
	 * @param duration 动画持续时间(单位:毫秒) 选填，默认0毫秒
	 */
	zoomToExtent(duration) {
    const vm = this
		duration = (duration)? duration : 0
		let LonLatArray = vm.polyline.getGeometry().getCoordinates()
		let extentBound = olExtent.boundingExtent(LonLatArray)
		vm.map.getView().fit(extentBound,{
			duration: duration
		})
	}

	/**
	 * 获取获取用户自定义属性
	 * @param 用户自定义属性(支持数字,字符串,json格式)
	 */
	getExtData() {
    const vm = this
		let extData = vm.polyline.values_.properties
		return extData
	}

	/**
	 * 设置用户自定义属性
	 * @param extData 用户自定义属性(支持数字,字符串,json格式)，必填
	 */
	setExtData(extData) {
    const vm = this
		extData = (extData)? extData : null
		if(extData != null) {
			vm.polyline.values_.properties = extData
		}
	}

	/**
	 * 设置文本标记地图对象，传入null时，移除点标记，
	 * 建议不使用此API，使用remove方法
	 * @param map 传入null，移除点标记
	 */
	setMap(map) {
    const vm = this
		map = (map)? map : null;
		if(map == null) {//当传入null时删除线标记
			if(vm.source.hasFeature(vm.polyline)) {
				vm.source.removeFeature(vm.polyline);
			}
		}
		else {}
	}

	/**
	 * 注册线标记事件
	 * @param eventName 鼠标事件
	 * "click":鼠标点击事件 "mousemove":鼠标悬停事件
	 * @param callback 选中线标记时触发函数
	 */
	on(eventName,callback) {
		let that = this
    const vm = this
		if(eventName == "pointermove"){
			vm.map.on('pointermove',function(e) {
				let pixel=vm.map.getEventPixel(e.originalEvent)
				let feature=vm.map.forEachFeatureAtPixel(pixel,function (feature) {
					return feature
				})
				if(feature != null && feature == vm.polyline){
					that.pointmoveFeature = feature
					callback(vm.polyline)
				}
				if(feature==undefined){
					if(that.pointmoveFeature){
						that.pointmoveFeature = null
						callback(null)
					}
				}
			})
		}else{
			vm.polyline.on(eventName,callback)
		}
	}

	/**
	 * 注销线标记事件(暂无该方法)
	 */
	off(eventName,callback) {}

	/**
	 * 线标记点击弹窗
	 * @param param JSON对象，弹窗参数信息，必填
	 * param.content 生成弹窗内容的回调函数，必填
	 * param.offsetX X轴方向偏移量(正向右，负向左)，选填参数，默认为0
	 * param.offsetY Y轴方向偏移量(正向下，负向上)，选填参数，默认为-25
	 */
	infoWindow(param){
    const vm = this
		let eventName = "click"
		vm.polyline.on(eventName,function(e){
			let lnglat = proj.toLonLat(e.event.coordinate)
			lnglat = new LngLat(lnglat[0],lnglat[1])
			let content = (param.content != undefined)? param.content : ""
			let offsetX = (param.offsetX != undefined)? param.offsetX : ""
			let offsetY = (param.offsetY != undefined)? param.offsetY : ""
			let infoWindow = new InfoWindow({
				type: "click",
				position: lnglat,
				content: content,
				offsetX: offsetX,
				offsetY: offsetY
			})
			infoWindow.open()
		})
  }
}
export default Polyline