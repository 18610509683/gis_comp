import OLMap from 'ol/Map'
import View from 'ol/View'
import * as proj from 'ol/proj'
import * as interaction from 'ol/interaction'
import SimpleLayer from './SimpleLayer'
import 'ol/ol.css'
import './css/KMap.css'
import * as Enum from './Enum'
import Common from './Common'
import Scale from './Scale'
import ToolBar from './ToolBar'
import VectorLayer from './VectorLayer'
import LT2DMapConfig from '../config/LT2DMapConfig'
import * as Extent from 'ol/extent'
import Overlay  from 'ol/Overlay'
/**
 * @description KMap.Map 地图类
*/
class Map {
	/**
	 * @description 地图实例
	 * @static
	 * @memberof Map
	 */
	Instance = null
	/**
	 * @description 信息窗体像素对象
	 * @memberof Map
	 */
	infoWindowPixel = null
	/**
	 * @description 鼠标移动事件弹窗UID
	 * @memberof Map
	 */
	InfowindowmoveUID = -1
	/**
	 * @description 鼠标点击事件弹窗UID
	 * @memberof Map
	 */
	InfowindowclickUID = -1
	/**
	 * @description 是否有鼠标移动弹窗
	 * @memberof Map
	 */
	ClearMouseMoveInfoWindow = false
	/**
	 * @description X方向缩放
	 * @memberof Map
	 */
	scaleX = 1
	/**
	 * @description Y方向缩放
	 * @memberof Map
	 */
	scaleY = 1
  /**
   * @param {string} id DOM元素ID
   * @param {number} zoomLevel 地图层级
   * @param {number} lng 纬度
   * @param {number} lat 经度
   * @description Map初始化方法
	 * @constructor
  */
  constructor(id,zoomLevel,lng,lat){
	const vm = this
	Map.Instance = this
    vm.baseLayer = this.initBaseLayer()
	Common.checkLngLat(lng,lat)
    let view = new View({
      center: proj.fromLonLat([lng,lat]),
      zoom: zoomLevel,
      minZoom: Common.ShowLevel[0],
      maxZoom: Common.ShowLevel[1],
    })
	this.view = view
    this.map = new OLMap({
      interactions: interaction.defaults().extend([
      new interaction.DragRotateAndZoom()]),
      target: id,
      layers: [vm.baseLayer],//vm.baseLayer
      view: view,
      control: []
    })
	//初始化插件
	this.initBaseControl()
	//初始化业务图层
	this.initBusinessLayer()
	//初始化地图信息弹窗
	this.initInfoWindow()
	//初始化地图基础事件
	this.initMapBaseEvent()
  }
	
  /**
	 * 初始化地图底图图层
   * @return {array}
	 * @memberof Map
  */
	initBaseLayer(){
		let mapType = null
		let mapUrl  = null
		if(Common.UseSimpleMap == true) {
			//自定义地图
			mapType = Enum.LayerTypeEnum.ARCGISTile
			mapUrl =  Common.SimpleMapDataUrl
		}
		else if(Common.UseTrafficMap == true) {
			//交通地图
			mapType = Enum.LayerTypeEnum.ARCGISTile
			mapUrl =  Common.TrafficMapDataUrl 
		}
		else if(Common.UseOnlineMap == true){
			//在线地图
			mapType = Enum.LayerTypeEnum.OnLineTile
			mapUrl =  Common.OnlineMapDataUrl
		}
		else {
			//高德地图
			mapType = Enum.LayerTypeEnum.GaoDeTile
			mapUrl =  Common.MapDataUrl
		}
		let object = new SimpleLayer(mapUrl,mapType)
    return object.layer
  }
	/**
	 * @description 初始化业务图层
	 * @memberof Map
	 */
	initBusinessLayer(){
		const vm = this
		let map = vm.map
		//创建默认点标记图层
		vm.markerLayer = new VectorLayer(LT2DMapConfig.MarkerLayerName,LT2DMapConfig.MarkerLayerZIndex)
		//创建默认线标记图层
		vm.polyLineLayer = new VectorLayer(LT2DMapConfig.PolylineLayerName,LT2DMapConfig.PolylineLayerZIndex)
		//创建默认面图层
		vm.polygonLayer = new VectorLayer(LT2DMapConfig.PolygonLayerName,LT2DMapConfig.PolygonLayerZIndex)
		//创建文本标记图层
		vm.labelLayer = new VectorLayer(LT2DMapConfig.PolygonLayerName,LT2DMapConfig.PolygonLayerZIndex)
		map.once('postrender', function(event) {
			map.addLayer(vm.markerLayer)
			map.addLayer(vm.polyLineLayer)
			map.addLayer(vm.polygonLayer)
			map.addLayer(vm.labelLayer)
		})
	}

	/**
	 * @description 初始化信息弹窗
	 * @memberof Map
	 */
	initInfoWindow(){
		const vm = this
		//创建地图弹窗容器
		let infoWindowBoxClick = document.createElement("div")
		let infoWindowBoxMove = document.createElement("div")
		let mapTarget = vm.map.getTargetElement()
		infoWindowBoxClick.id = "infowindow-click"
		infoWindowBoxMove.id = "infowindow-move"
		infoWindowBoxClick.style.zIndex = 999
		infoWindowBoxMove.style.zIndex = 999
		mapTarget.appendChild(infoWindowBoxClick)
		mapTarget.appendChild(infoWindowBoxMove)
		vm.infoWindow_click = new Overlay({
			element: infoWindowBoxClick
		})
		vm.infoWindow_move = new Overlay({
			element: infoWindowBoxMove
		})
		//添加点击弹窗
		vm.map.addOverlay(vm.infoWindow_click)
		//添加悬停弹窗
		vm.map.addOverlay(vm.infoWindow_move)
	}
	/**
	 * @description 初始化地图基础事件
	 * @memberof Map
	 */
	initMapBaseEvent(){
		const vm = this
		var allowTriggerEvent = function(pixel) {
			var infoWindowPixel = vm.infoWindowPixel
			if(infoWindowPixel == null){
				return true
			}
			var x = pixel[0]
			var y = pixel[1]
			if(x>=infoWindowPixel[0] && x<=infoWindowPixel[2] &&
				 y>=infoWindowPixel[1] && y<=infoWindowPixel[3]) {
				return false
			}
			return true
		}
		vm.map.on('click',function(event){
			event.pixel[0] = (event.pixel[0] / vm.scaleX)
			event.pixel[1] = (event.pixel[1] / vm.scaleY)
			var clickFeature = vm.map.forEachFeatureAtPixel(event.pixel, function(feature){
				if(!allowTriggerEvent(event.pixel)) return
				// 为点击到的feature发送自定义的click消息
				feature.dispatchEvent({type: 'click', event: event})
				return feature
			})
			//点击在地图空白处时清空弹窗
			if(clickFeature == undefined){
				vm.clearInfoWindow()
			}
		})

		//为地图注册鼠标点击事件的监听
		vm.map.on('pointermove', function(event) {
			event.pixel[0] = (event.pixel[0] / vm.scaleX)
			event.pixel[1] = (event.pixel[1] / vm.scaleY)
			var mousemoveFeature = vm.map.forEachFeatureAtPixel(event.pixel, function(feature){
				if(!allowTriggerEvent(event.pixel)){
					return
				}
				// 为点击到的feature发送自定义的mousemove消息
				if(feature.dispatchEvent != undefined){
					feature.dispatchEvent({type: 'mousemove', event: event})
				}
				return feature
			})
			//悬停在地图空白处时清空悬停弹窗
			if(mousemoveFeature == undefined)
			{
				vm.clearMouseMoveInfoWindow()
			}
			//设置鼠标悬停到覆盖物上的样式
			var mapContainer = vm.getTarget()
			if(mousemoveFeature) {
				mapContainer.style.cursor = "pointer"
			}
			else {
				mapContainer.style.cursor = "default"
			}
		})
	}

	setScale(x, y) {
		const vm = this
		// var mapContainer = vm.getTarget()
		// mapContainer.style.overflow = 'hidden'
		// var mapContent = mapContainer.getElementsByClassName('ol-viewport')[0]
		// var scaleX = 1 / Number(x);
		// var scaleY = 1 / Number(y);
		vm.scaleX = Number(x)
		vm.scaleY = Number(y)
		// mapContent.style.transform = "scale("+scaleX+","+scaleY+")"
	}

	/**
	 * @description 清除鼠标点击弹窗
	 * @memberof Map
	*/
	clearInfoWindow() {
		const vm = this
		vm.infoWindow_click.setPosition(undefined)
		vm.infoWindow_move.setPosition(undefined)
		vm.infoWindowPixel = null
		vm.InfowindowmoveUID = -1
		vm.InfowindowclickUID = -1
	}
	
	/**
	 * @description 清除鼠标移动弹窗
	 * @memberof Map
	*/
	clearMouseMoveInfoWindow() {
		const vm = this
		if(vm.ClearMouseMoveInfoWindow) {
			vm.infoWindow_move.setPosition(undefined)
			vm.infoWindowPixel = null
			vm.InfowindowmoveUID = -1
		}
	}

  /**
	 * @description 获取地图容器div
	 * @returns 地图容器div
	 * @memberof Map
	 */
	getTarget() {
		let target = this.map.getTargetElement()
		return target
	}

	/**
	 * @description 获取地图容器尺寸
	 * @returns KMap.Size格式的尺寸
	 * @memberof Map
	 */
	getSize() {
		let size = this.map.getSize()
		console.log(Common)
		size = Common.MapSize2KMapSize(size)
		return size
	}
	
	/**
	 * @description 获取地图投影EPSG类型
	 * @returns 地图投影类型
	 * @memberof Map
	 */
	getProjection() {
		let projection = this.view.getProjection()
		return projection
	}
	
	/**
	 * @description 获取地图中心
	 * @returns 地图中心，KMap.LngLat对象格式
	 * @memberof Map
	 */
	getCenter() {
		let center = this.view.getCenter()
		center = proj.toLonLat(center)
		return Common.MapLngLat2KMapLngLat(center)
	}
	
	/**
	 * @description 设置地图中心
	 * @param {KMap.LngLat} position 地图中心位置，KMap.LngLat对象格式，必填
	 * @memberof Map
	 */
	setCenter(position) {
		let centerlnglat = Common.KMapLngLat2MapLngLat(position)
		let center = proj.fromLonLat(centerlnglat)
		this.view.setCenter(center)
	}
	
	/**
	 * @description 地图中心点平移至指定点位置
	 * @param {KMap.LngLat} point 指定点经纬度坐标，KMap.LngLat对象格式，必填
	 * @param {number} zoom 缩放级别，选填参数，不填则使用当前缩放级别
	 * @memberof Map
	 */
	panTo(point,zoom) {
		point = Common.KMapLngLat2MapLngLat(point)
		let center = proj.fromLonLat(point)
		if(zoom) {
			this.view.animate({center:center},{zoom:zoom})
		}
		else {
			this.view.animate({center:center})
		}
	}
	
	/**
	 * @description 地图放大一级显示
	 * @memberof Map
	 */
  zoomIn() { 
		this.view.setZoom( this.getZoom() + 1 )
		return this.getZoom()
	}

	/**
	 * @description 地图缩小一级显示
	 * @memberof Map
	 */
  zoomOut() { 
		this.view.setZoom( this.getZoom() - 1)
		return this.getZoom()
	}

	/**
	 * @description 缩放到点标记图层范围
	 * @param {number} duration 选填参数，动画时长(单位:毫秒)，不填则使用默认的0毫秒
	 * @memberof Map
	 */
	zoomToMarkerLayer(duration) {
		const vm = this
		duration = (duration != undefined)? duration : 0
		let markers = vm.markerLayer.getSource().getFeatures()
		let coordinateArray = new Array()
		for(let i=0; i<markers.length; i++) {
			coordinateArray.push(markers[i].getGeometry().getCoordinates())
		}
		let extentBound = new Extent.boundingExtent(coordinateArray)
		this.view.fit(extentBound,{
			duration: duration
		})

		this.view.fit(vm.markerLayer.getSource().getExtent(),{
			duration: duration
		})
	}
	
	/**
	 * @description 缩放到点标记集合范围
	 * @param {Array} markerArray 点标记集合，必填
	 * @param {number} duration 选填参数，动画时长(单位:毫秒)，不填则使用默认的0毫秒
	 * @memberof Map
	 */
	zoomToMarkerArray(markerArray,duration) {
		duration = (duration != undefined)? duration : 0
		let coordinateArray = new Array()
		for(let i=0; i<markerArray.length; i++) {
			coordinateArray.push(markerArray[i].Marker.getGeometry().getCoordinates())
		}
		let extentBound = new Extent.boundingExtent(coordinateArray)
		this.view.fit(extentBound,{
			duration: duration
		})
	}
	
	/**
	 * @description 缩放到文本标记图层范围
	 * @param {number} duration 选填参数，动画时长(单位:毫秒)，不填则使用默认的0毫秒
	 * @memberof Map
	 */
	zoomToLabelLayer(duration) {
		duration = (duration != undefined)? duration : 0
		this.view.fit(labelLayer.getSource().getExtent(),{
			duration: duration
		})
	}
	
	/**
	 * @description 缩放到文本标记集合范围
	 * @param {Array}  labelArray 文本标记集合，必填
	 * @param {number} duration 选填参数，动画时长(单位:毫秒)，不填则使用默认的0毫秒
	 * @memberof Map
	 */
	zoomToLabelArray(labelArray,duration) {
		duration = (duration != undefined)? duration : 0
		let coordinateArray = new Array()
		for(let i=0; i<labelArray.length; i++) {
			coordinateArray.push(labelArray[i].Label.getGeometry().getCoordinates())
		}
		let extentBound = new Extent.boundingExtent(coordinateArray)
		this.view.fit(extentBound,{
			duration: duration
		})
	}
	
	/**
	 * @description 缩放到线图层范围
	 * @param {number} duration 选填参数，动画时长(单位:毫秒)，不填则使用默认的0毫秒
	 * @memberof Map
	 */
	zoomToPolylineLayer(duration) {
		const vm = this
		duration = (duration != undefined)? duration : 0
		this.view.fit(vm.polyLineLayer.getSource().getExtent(),{
			duration: duration
		})
	}
	
	/**
	 * @description 缩放到线标记集合范围
	 * @param {Array} lineArray 线标记集合，必填
	 * @param {number} duration 选填参数，动画时长(单位:毫秒)，不填则使用默认的0毫秒
	 * @memberof Map
	 */
	zoomToPolylineArray(lineArray,duration) {
		duration = (duration != undefined)? duration : 0
		let coordinateArray = new Array()
		for(let i=0; i<lineArray.length; i++) {
			let coordinates = lineArray[i].polyline.getGeometry().getCoordinates()
			for(let z=0; z<coordinates.length; z++) {
				coordinateArray.push(coordinates[z])
			}
		}
		let extentBound = new Extent.boundingExtent(coordinateArray)
		this.view.fit(extentBound,{
			duration: duration
		})
	}
	
	/**
	 * @description 缩放到经纬度数组范围
	 * @param {Array} lngLatArray KMap.LngLat格式的经纬度坐标数组，必填
	 * @param {number} duration 选填参数，动画时长(单位:毫秒)，不填则使用默认的0毫秒
	 * @memberof Map
	 */
	zoomToLngLatArray(lngLatArray,duration) {
		duration = (duration != undefined)? duration : 0
		let coordinateArray = new Array()
		for(let i=0; i<lngLatArray.length; i++) {
			let point = Common.KMapLngLat2MapLngLat(lngLatArray[i])
			coordinateArray.push(proj.fromLonLat(point))
		}
		let extentBound = new Extent.boundingExtent(coordinateArray)
		this.view.fit(extentBound,{
			duration: duration
		})
	}
	
	/**
	 * @description 调整地图视角到能够显示所有覆盖物的合适矩形范围
	 * @param {number} duration 选填参数，动画时长(单位:毫秒)，不填则使用默认的0毫秒
	 * @memberof Map
	 */
	setFitView(duration) {
		const vm = this
		//获取所有元素坐标点集合
		let LonLatArray = new Array()
		let markers = vm.markerLayer.getSource().getFeatures()
		let labels = vm.labelLayer.getSource().getFeatures()
		let polylines = vm.polyLineLayer.getSource().getFeatures()
		let features = [markers,labels,polylines]
		for(let i=0; i<features.length; i++) {
			for(let z=0; z<features[i].length; z++) {
				let featureLonLats = features[i][z].getGeometry().getCoordinates()
				if(features[i] != polylines) {
					LonLatArray.push(featureLonLats)
				}
				else {
					for(let m=0; m<featureLonLats.length; m++) {
						LonLatArray.push(featureLonLats[m])
					}
				}
			}
		}
		//地图视角切换到坐标点集合的矩形范围
		duration = (duration != undefined)? duration : 0
		let extentBound = new Extent.boundingExtent(LonLatArray)
		this.view.fit(extentBound,{
			duration: duration
		})
	}
	
	/**
	 * @description 获取地图分辨率
	 * @returns {number} 地图分辨率
	 * @memberof Map
	 */
	getResolution() {
		let resolution = this.view.getResolution()
		return resolution
	}
	
	/**
	 * @description 获取地图当前缩放值
	 * @returns {number} 地图缩放级别
	 * @memberof Map
	 */
	getZoom() {
		let zoom = this.view.getZoom()
		return zoom
	}
	
	/**
	 * @description 设置地图当前缩放值
	 * @param {number}zoom 缩放值，必填
	 * @memberof Map
	 */
	setZoom(zoom) {
		this.view.setZoom(zoom)
	}
	
	/**
	 * @description 获取地图最大缩放值
	 * @returns {number} 最大缩放值
	 * @memberof Map
	 */
	getMaxZoom() {
		let maxZoom = this.view.getMaxZoom()
		return maxZoom
	}
	
	/**
	 * @description 设置地图最大缩放值
	 * @param {number} zoom 最大缩放值，必填
	 * @memberof Map
	 */
	setMaxZoom(zoom) {
		this.view.setMaxZoom(zoom)
	}
	
	/**
	 * @description 获取地图最小缩放值
	 * @returns {number} 最小缩放值
	 * @memberof Map
	 */
	getMinZoom () {
		let minZoom = this.view.getMinZoom()
		return minZoom
	}
	
	/**
	 * @description 设置地图最小缩放值
	 * @param {number} zoom 最小缩放值，必填
	 * @memberof Map
	 */
	setMinZoom(zoom) {
		this.view.setMinZoom(zoom)
	}
	
	/**
	 * @description 设置地图中心和缩放级别
	 * @param {number} zoom 缩放级别，必填
	 * @param {KMap.LngLat} center 地图中心 KMap.LngLat对象格式，必填
	 * @param {boolean} animate 选填，是否使用缓冲动画，默认为false
	 * @memberof Map
	 */
	setZoomAndCenter(zoom,center,animate) {
		let centerlnglat = Common.KMapLngLat2MapLngLat(center)
		center = proj.fromLonLat(centerlnglat)
		if(animate) {
			this.view.animate({center:center,zoom:zoom})
		}
		else {
			this.view.setCenter(center)
			this.view.setZoom(zoom)
		}
	}
	
	/**
	 * @description 获取地图经纬度矩形范围
	 * @returns {KMap.Bounds} 地图经纬度矩形范围，KMap.Bounds格式
	 * @memberof Map
	 */
	getBounds() {
		let bounds = this.view.calculateExtent(map.getSize())
		let southWest = proj.toLonLat([bounds[0],bounds[1]])
		let northEast = proj.toLonLat([bounds[2],bounds[3]])
		bounds = [southWest[0],southWest[1],northEast[0],northEast[1]]
		let mapBound = Common.MapBounds2KMapBounds(bounds)//将OL的Bounds格式转换成KMap的Bounds格式
		return mapBound
	}
	
	/**
	 * @description 设置地图经纬度矩形范围
	 * @param {KMap.Bounds} bound 地图经纬度矩形范围，KMap.Bounds格式，必填
	 * @memberof Map
	 */
	setBounds(bound) {
		let lnglatArray = new Array()
		let mapBound = Common.KMapBounds2MapBounds(bound)//将KMap的Bounds格式转换成OL的Bounds格式
		lnglatArray.push(proj.fromLonLat([mapBound[0],mapBound[1]]))
		lnglatArray.push(proj.fromLonLat([mapBound[2],mapBound[3]]))
		let bounds = new Extent.boundingExtent(lnglatArray)
		this.view.fit(bounds) //地图视角切换到矩阵范围
	}
	
	/**
	 * @description 平面地图像素坐标转经纬度坐标
	 * @param {KMap.Pixel} pixel 平面地图像素坐标，格式为KMap.Pixel对象，必填
	 * @returns {KMap.LngLat} 经纬度坐标，格式为KMap.LngLat对象
	 * @memberof Map
	 */
	pixelToLngLat(pixel) {
		pixel = Common.KMapPixel2MapPixel(pixel)
		let lnglat = new proj.toLonLat(pixel)
		return Common.MapLngLat2KMapLngLat(lnglat)
	}
	
	/**
	 * @description 经纬度坐标转平面地图像素坐标
	 * @param {KMap.LngLat} lnglat 经纬度坐标，格式为KMap.LngLat对象，必填
	 * @returns {KMap.Pixel} 地图像素坐标，格式为KMap.Pixel对象
	 * @memberof Map
	 */
	lnglatToPixel(lnglat) {
		lnglat = Common.KMapLngLat2MapLngLat(lnglat)
		let pixel = proj.fromLonLat(lnglat)
		return Common.MapPixel2KMapPixel(pixel)
	}
	
	/**
	 * @description 地图容器屏幕坐标转经纬度坐标
	 * @param {KMap.Pixel} pixel 地图容器像素，格式为KMap.Pixel对象，必填
	 * @returns {KMap.LngLat} 返回KMap.LngLat格式的经纬度
	 * @memberof Map
	 */
	containerToLngLat(pixel) {
		pixel = Common.KMapPixel2MapPixel(pixel)
		let lnglat =this.map.getCoordinateFromPixel(pixel)
		lnglat = proj.toLonLat(lnglat)
		lnglat = Common.MapLngLat2KMapLngLat(lnglat)
		return lnglat
	}
	
	/**
	 * @description 经纬度坐标转地图容器屏幕坐标
	 * @param {KMap.LngLat} lnglat 经纬度坐标，KMap.LngLat格式的经纬度，必填
	 * @returns {KMap.Pixel} 返回地图容器像素，格式为KMap.Pixel对象
	 * @memberof Map
	 */
	lngLatToContainer(lnglat) {
		lnglat = Common.KMapLngLat2MapLngLat(lnglat)
		let coordinate = proj.fromLonLat(lnglat)
		let container =this.map.getPixelFromCoordinate(coordinate)
		return Common.MapPixel2KMapPixel(container)
	}
	
	/**
	 * @description 获取地图顺时针旋转角度
	 * @returns {number} 顺时针旋转角度（弧度）
	 * @memberof Map
	 */
	getRotation() {
		let rotation = this.view.getRotation()
		return rotation
	}
	
	/**
	 * @description 设置地图顺时针旋转角度
	 * @param {number} rotation 顺时针旋转角度（弧度），必填
	 * @memberof Map
	 */
	setRotation(rotation) {
		this.view.setRotation(rotation)
	}
	
	/**
	 * @description 获取地图插件集合
	 * @returns {Array} 地图插件集合数组
	 * @memberof Map
	 */
	getControls() {
		let controls =this.map.getControls().array_
		return controls
	}

	/**
	 * @description 添加插件
	 * @param {ol.control} control OL原生control对象
	 * @memberof Map
	 */
	addControl(control) {
		let state = true
		let controls = this.map.getControls().array_
		for(let i=0; i<controls.length; i++) {
			if(control == controls[i]) {
				state = false
				break
			}
		}
		if(state){
			this.map.addControl(control)
		}
	}
	
	/**
	 * @description 删除插件
	 * @param {ol.control} control 插件，必填
	 * @memberof Map
	 */
	removeControl(control) {
		let controls = this.map.getControls().array_
		for(let i=0; i<controls.length; i++) {
			if(control == controls[i]) {
				this.map.removeControl(controls[i])
				return
			}
		}
	}
	
	/**
	 * @description 清空默认插件 注意如果要清除默认插件需要在加载其他插件前调用此函数
	 * @memberof Map
	 */
	removeOriginControls() {
		let controls = this.map.getControls().array_
		for(let i=0; i<controls.length; i++) {
			this.map.removeControl(controls[i])
		}
	}

	/**
	 * @description 设置初始插件
	 * @memberof Map
	 */
	initBaseControl(){
		if(Common.ShowToolbarControl){
			  let toolBar = new ToolBar(this).toolBar
				this.map.addControl(toolBar.zoom)
				this.map.addControl(toolBar.zoomSlider)
		}
		let scale = new Scale(this).scale
		this.map.addControl(scale)
	}
	
	/**
	 * @description 获取地图指针样式
	 * @memberof Map
	 */
	getDefaultCursor() {
		let mapContainer = this.map.getTargetElement()
		let cursor = mapContainer.style.cursor
		return cursor
	}
	
	/**
	 * @description 设置地图指针样式
	 * @param {String} cursorStyle 鼠标样式("default"默认指针,"pointer"小手,"move"移动指针, "text"文本指针,"wait"等待状态,"help"帮助)，必填
	 * @memberof Map
	*/
	setDefaultCursor(cursorStyle) {
		let mapContainer = this.map.getTargetElement()
		if(cursorStyle != undefined) {
			mapContainer.style.cursor = cursorStyle
		}
		else {
			mapContainer.style.cursor = "default"
		}
	}
	
	/**
	 * @description 设置鼠标悬停在元素上时的样式
	 * @param {String} cursorStyle 鼠标样式("default"默认指针,"pointer"小手,"move"移动指针, "text"文本指针,"wait"等待状态,"help"帮助)，必填
	 * @memberof Map 
	*/
	setFeatureCursor(cursorStyle) {
		cursorStyle = (cursorStyle == undefined)? "default" : cursorStyle
		let mapContainer = this.map.getTargetElement()
		let defaultCursor = mapContainer.style.cursor
		this.map.on("pointermove",function(e){
			let features = this.map.forEachFeatureAtPixel(e.pixel,function(feature) { return feature })
			if(features) {
				mapContainer.style.cursor = cursorStyle
			}
			else {
				mapContainer.style.cursor = defaultCursor
			}
		})
	}

	/**
	 * @description 获取地图显示元素种类
	 * @returns {Array} 地图显示元素种类集合
	 * @memberof Map
	 */
	getFeatures() {
		const vm = this
		let features = new Array()
		if(vm.baseLayer.getVisible() == true) {
			features.push("Tile")
		}
		if(vm.markerLayer.getVisible() == true){
			features.push("Marker")
		}
		if(vm.labelLayer.getVisible() == true){
			features.push("Label")
		}
		if(vm.polyLineLayer.getVisible() == true){
			features.push("PolyLine")
		}
		return features
	}

	/**
	 * @description 设置地图显示元素种类
	 * @param {JSON} param param 地图元素显示参数，JSON对象，必填
	 * param.marker true/false，点标记是否显示，选填
	 * param.label true/false，文本标记是否显示，选填
	 * param.polyline true/false，线标记是否显示，选填
	 * @memberof Map
	 */
	setFeatures(param) {
		const vm = this
		if(param.marker == true || param.marker == false){
			vm.markerLayer.setVisible(param.marker)
		}
		
		if(param.label == true || param.label == false){
			vm.labelLayer.setVisible(param.label)
		}
		
		if(param.polyline == true || param.polyline == false){
			vm.polyLineLayer.setVisible(param.polyline)
		}
		
	}
	
	/**
	 * @description 获取地图状态（双击缩放/拖拽/滚动鼠标中间缩放）
	 * @returns {JSON} 地图状态 
	 * {"DoubleClickZoom": true, "DragAndDrop": true, "MouseWheelZoom": true}
	 * @memberof Map
	 */
	getStates() {
		let interactions =this.map.getInteractions().array_
		let DoubleClickZoom,DragAndDrop,MouseWheelZoom
		for(let i=0; i<interactions.length; i++) {
			if(i==1) DoubleClickZoom = interactions[i].getActive()
			if(i==2) DragAndDrop = interactions[i].getActive()
			if(i==7) MouseWheelZoom = interactions[i].getActive()
		}
		let states = {
			"DoubleClickZoom": DoubleClickZoom,
		  "DragAndDrop": DragAndDrop,
		  "MouseWheelZoom": MouseWheelZoom
		}
		return states
	}
	
	/**
	 * @description 设置地图状态（双击缩放/拖拽/滚动鼠标中间缩放）
	 * @param {JSON} param 地图状态 JSON对象，必填
	 * param.DoubleClickZoom true/false(双击缩放地图)，选填
	 * param.DragAndDrop true/false(地图拖拽)，选填
	 * param.MouseWheelZoom true/false(滚动鼠标中间缩放地图)，选填
	 * @memberof Map
	 */
	setStates(param) {
		let interactions =this.map.getInteractions().array_
		if(param.DoubleClickZoom == true || param.DoubleClickZoom == false)
		interactions[1].setActive(param.DoubleClickZoom)
		if(param.DragAndDrop == true || param.DragAndDrop == false)
		interactions[2].setActive(param.DragAndDrop)
		if(param.MouseWheelZoom == true || param.MouseWheelZoom == false)
		interactions[7].setActive(param.MouseWheelZoom)
	}
	
	/**
	 * @description 清空地图所有元素
	 * @memberof Map
	 */
	clearMap() {
		const vm = this
		//清空图层元素
		vm.markerLayer.getSource().clear()
		vm.labelLayer.getSource().clear()
		vm.polyLineLayer.getSource().clear()
		//清空地图弹窗
		vm.clearInfoWindow()
	}
	
	/**
	 * @description 清除地图对象并清空地图容器(建议少使用此API,容易造成报错)
	 * @memberof Map
	 */
	destroy() {
		//清空地图对象
		this.map.destroy()
		//清空地图容器
		let target =this.map.getTargetElement()
		target.innerHTML = ""
	}
	
	/**
	 * @description 获取地图图层数组
	 * @return {Array} 地图图层数组
	 * @memberof Map
	 */
	getLayers() {
		let layers =this.map.getLayers().array_
		return layers
	}
	
	/**
	 * @description 设置地图各个图层显示/隐藏
	 * @param {JSON} param 地图图层显示参数，JSON对象，必填
	 * param.Marker true/false，点标记图层显示/隐藏，选填
	 * param.Label true/false，文本标记图层显示/隐藏，选填
	 * param.PolyLine true/false，线标记图层显示/隐藏，选填
	 * @memberof Map
	 */
	setLayers(param) {
		const vm = this
		if(param.Marker == true || param.Marker == false){
			vm.markerLayer.setVisible(param.Marker)
		}
		if(param.Label == true || param.Label == false){
			vm.labelLayer.setVisible(param.Label)
		}
		if(param.PolyLine == true || param.PolyLine == false){
			vm.polyLineLayer.setVisible(param.PolyLine)
		}
	}
	
	/**
	 * @description 获取地图各个图层index值
	 * @returns {JSON} JSON对象
	 * {"markerLayer": 0, "labelLayer": 0, "polyLineLayer": 0}
	 * @memberof Map
	 */
	getLayersIndex() {
		const vm = this
		let index = {}
		index.markerLayer = vm.markerLayer.getZIndex()
		index.labelLayer = vm.labelLayer.getZIndex()
		index.polyLineLayer = vm.polyLineLayer.getZIndex()
		return index
	}
	
	/**
	 * @description 设置地图各个图层index值，index值大的图层显示在上方,值相同时后加载的图层显示在上方
	 * @param {JSON} param 图层索引JSON对象，必填
	 * param.marker 点标记图层index值，选填
	 * param.label 文字标记图层index值，选填
	 * param.polyLine 线标记图层index值，选填
	 * @memberof Map
	 */
  setLayersIndex(param) {
		const vm = this
		let markerIndex = (param.marker)? param.marker : vm.markerLayer.getZIndex()
		let labelIndex = (param.label)? param.label : vm.labelLayer.getZIndex()
		let polyLineIndex = (param.polyLine)? param.polyLine : vm.polyLineLayer.getZIndex()
		vm.markerLayer.setZIndex(markerIndex)
		vm.labelLayer.setZIndex(labelIndex)
		vm.polyLineLayer.setZIndex(polyLineIndex)
	}
	
	/**
	 * @description 注册地图事件
	 * @param {String} eventName 地图操作事件类型，必填
	 * "click":单击地图,双击将触发两次;"singleclick":单击地图;"dblclick":双击地图;"movestart":开始移动地图;
	 * "moveend":移动地图结束;"postrender":渲染地图后;"pointerdrag":拖动指针时;"mousemove":移动指针时
	 * @param {funciton} callback 操作事件触发时调用的函数，必填
	 * @memberof Map
	 */
	on(eventName,callback) {
		if(eventName == "mousemove"){
			eventName = "pointermove"
		}
		if(eventName == "load"){
			eventName = "postrender"
		}
		this.map.on(eventName,callback)
	}
	
	/**
	 * @description 注册地图事件(事件仅执行一次)
	 * @param {Strig} eventName 地图操作事件类型，必填
	 * "click":单击地图,双击将触发两次;"singleclick":单击地图;"dblclick":双击地图;"movestart":开始移动地图;
	 * "moveend":移动地图结束;"postrender":渲染地图后;"pointerdrag":拖动指针时;"mousemove":移动指针时
	 * @param {function} callback 操作事件触发时调用的函数，必填
	 * @memberof Map
	 */
	once(eventName,callback) {
		if(eventName == "mousemove"){
			eventName = "pointermove"
		}
		if(eventName == "load"){
			eventName = "postrender"
		}
		this.map.once(eventName,callback)
	}
	
	/**
	 * @description 取消地图绑定事件
	 * @param {Strig} eventName 地图操作事件类型，必填
	 * "click":单击地图,双击将触发两次;"singleclick":单击地图;"dblclick":双击地图;"movestart":开始移动地图;
	 * "moveend":移动地图结束;"postrender":渲染地图后;"pointerdrag":拖动指针时;"mousemove":移动指针时
	 * @param {function} callback 操作事件触发时调用的函数，必填
	 * @memberof Map
	 */
	off(eventName,callback) {
		if(eventName == "mousemove"){
			eventName = "pointermove"
		}
		if(eventName == "load"){
			eventName = "postrender"
		}
		this.map.un(eventName,callback)
	}
}
export default Map