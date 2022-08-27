import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import * as proj from 'ol/proj'
import Style from 'ol/style/Style'
import Text from 'ol/style/Text'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import Icon from 'ol/style/Icon'
import Overlay from 'ol/Overlay'
import Common from './Common'
import LTBaseObject from './LTBaseObject'
/**
 * @description LTMap.Marker 点标记类
 */
class Marker extends LTBaseObject{
  /**
   * @description 初始化Marker构造函数
   * @param {number} lng lng 经度 必填
   * @param {number} lat lat 纬度 必填
   * @param {String} markerImgUrl 点标记图标路径 必填
   * @param {number} offsetX X方向偏移量(正向右，负向左) 必填
   * @param {number} offsetY Y方向偏移量(正向下，负向上) 必填
   * @param {number} width  点标记尺寸宽度 必填
   * @param {number} height 点标记尺寸高度 必填
   * @param {JSON} param param.source 指定source 选填
	 * @param {LTMap.Map} [mapInstance=null] map对象，单地图的时候可不传，多地图时候需要传
   * @constructor
   */
  constructor(lng,lat,url,offsetX,offsetY,width,height,param,mapInstance = null){
		super(mapInstance)
		const vm = this
    //对于必填的参数进行验证
		vm.point = new Point(proj.fromLonLat([lng,lat]))
    let marker = new Feature({
      geometry: vm.point,
      properties: null
    })
    vm.marker = marker
		vm.source = vm.mapInstance.markerLayer.getSource()
		if(param && param.source){
			vm.source = param.source
		}
		vm.source.addFeature(marker)
		Common.notEmpty("url",url)
		vm.url = url
		vm.style = vm.initSyle(vm.url,offsetX,offsetY,width,height)
		vm.image = vm.style.getImage()
		vm.contentInfo = {}
		Common.checkLngLat(lng,lat)
		vm.lngLat = [lng,lat]
  }

	/**
	 * @description 初始化Marker样式
	 * @param {String} url marker 图片地址
	 * @param {number} offsetX  X方向偏移量(正向右，负向左) 必填
	 * @param {number} offsetY  Y方向偏移量(正向下，负向上) 必填
	 * @param {number} width  点标记尺寸宽度 必填
	 * @param {number} height 点标记尺寸高度 必填
	 * @memberof Marker
	 */
	initSyle(url,offsetX,offsetY,width,height){
		const vm = this
		offsetX = -offsetX/width
		offsetY = -offsetY/height
		let style = new Style({
			image: new Icon({
				src: url,
				anchor: [offsetX,offsetY] //点标记偏移
			}),
			zIndex: 0
		})
		vm.marker.setStyle(style)
		return style
	}

	/**
	 * @description 获取点标记id
	 * @returns {String} 点标记id
	 */
	getId() {
		const vm = this
		let id = vm.marker.getId()
		return id
	}

	/**
	 * @description 设置点标记id
	 * @param {String}id 点标记id 必填
	 */
	setId(id) {
		const vm = this
		vm.marker.setId(id)
	}

	/**
	 * 点标记添加文本
	 * @param {JSON} param json对象，文本参数，必填
	 * param.text 文本内容，必填
	 * param.font 字体大小，默认为13px sans-serif，选填
	 * param.offsetX X轴偏移(正向右，负向左)，选填，默认为0
	 * param.offsetY Y轴偏移(正向下，负向上)，选填，默认为25
	 * param.rotation 旋转角度，选填，默认0
	 * param.fill 填充颜色，选填，默认black
	 * param.backgroundColor 背景色，选填，默认#fff
	 * param.backgroundStroke 边框颜色，选填，默认black
	 * param.padding padding值，选填，默认[2,5,2,5]
	 */
	setText(param) {
		const vm = this
		let text = (param.text)? param.text : ""
		let font = (param.font)? param.font : '13px sans-serif'
		let offsetX = (param.offsetX)? param.offsetX : 0
		let offsetY = (param.offsetY)? param.offsetY : 25
		let rotation = (param.rotation)? param.rotation : 0
		let fill = (param.fill)? param.fill : "black"
		let backgroundColor = (param.backgroundColor)? param.backgroundColor : "#fff"
		let backgroundStroke = (param.backgroundStroke)? param.backgroundStroke : "black"
		let padding = (param.padding)? param.padding : [2,5,2,5]
		text = new Text({
			text: text,
			font: font,
			offsetX: offsetX,
			offsetY: offsetY,
			rotateWithView: false,//文本是否可旋转
			rotation: rotation,
			fill: new Fill({
					color: fill
			}),
			backgroundFill: new Fill({
					color: backgroundColor
			}),
			backgroundStroke: new Stroke({
					color: backgroundStroke
			}),
			padding: padding
		})
		if(text){
			vm.style.setText(text)
		}
	}

	/**
	 * @description 显示点标记
	 */
	show(){
		const vm = this
		if(!vm.source.hasFeature(marker)) {
			vm.source.addFeature(marker)
			if(vm.markerPopup){
				vm.map.removeOverlay(vm.markerPopup)
			}
			vm.showContent()
		}
	}

	/**
	 * @description 隐藏点标记
	 */
	hide(){
		const vm = this
		if(vm.source.hasFeature(marker)) {
			vm.source.removeFeature(marker);
			if(vm.markerPopup){
				vm.map.removeOverlay(vm.markerPopup)
			}
			vm.hideContent()
		}
	}

	/**
	 * @description 删除点标记
	 */
	remove(){
		const vm = this
		if(vm.source.hasFeature(vm.marker)) {
			vm.source.removeFeature(vm.marker)
			if(vm.markerPopup){
				vm.map.removeOverlay(vm.markerPopup)
			}
			vm.hideContent()
		}
	}

	/**
	 * @description 设置点标记为透明样式
	 */
	setHideStyle(){
		const vm = this
		let hideStyle = new Style({
			stroke: new Stroke({
				color: "transparent",
				width: 1
			})
		})
		vm.marker.setStyle(hideStyle)
	}

	/**
	 * @description 获取点标记图标地址
	 * @returns {String} 点标记图标地址
	 */
	getIcon(){
		const vm = this
		let icon = vm.image.iconImage_.src_
		return icon
	}

	/**
	 * @description 设置点标记图标
	 * @param {String} url 点标记图标地址，必填
	 */
	setIcon(url){
		const vm = this
		let style = new Style({
			image: new Icon({
				src: url,
				anchor: [offsetX,offsetY] //点标记偏移
			}),
			zIndex: 0
		})
		vm.marker.setStyle(style)
	}

	/**
	 * @description 获取点标记坐标
	 * @returns {LTMap.LngLat} 返回LTMap.LngLat格式的经纬度
	 */
	getPosition() {
		const vm = this
		let position = proj.toLonLat(vm.point.getCoordinates())
		position = Common.MapLngLat2LTMapLngLat(position)
		return position
	}

	/**
	 * @description 设置点标记坐标
	 * @param {LTMap.LngLat} lnglat 格式的点标记经纬度，必填
	 */
	setPosition(lnglat) {
		const vm = this
		lnglat = Common.LTMapLngLat2MapLngLat(lnglat)
		let position = proj.fromLonLat(lnglat)
		vm.point.setCoordinates(position)
		// console.log(vm.source.getState())
		if(vm.markerPopup){
			vm.markerPopup.setPosition(vm.point.getCoordinates())
		}
	}

	/**
   * @description 设置点标记动画
   * @param { LTMap.LngLat } lnglat 目标位置
   * @memberof Marker
   */
  setPositionAnimate(lnglat){
		const vm = this
		let currentTime = new Date()
		if(vm.lastTime == undefined  &&  vm.lastPoint == undefined){
			vm.lastTime = currentTime
			vm.lastPoint = lnglat
			return
		}
		let splitTime = currentTime.getTime()-vm.lastTime.getTime()
		vm.lastTime = currentTime
		let point = vm.lastPoint
		vm.lastPoint = lnglat
    let begin = Common.LTMapLngLat2MapLngLat(vm.getPosition())
    let end = Common.LTMapLngLat2MapLngLat(point)
    let from = turf.point(begin)
    let to = turf.point(end)
    //将路径均匀切分，使小车匀速运动
    //将线段再次切分
    function splitLine(from, to,time) {
      if(!time){
        time = 60
      }
      let distance = turf.distance(from, to, {
        units: 'kilometers'
      })
      let step = splitTime*2-2
      let splitLength = distance/step
      let leftLength = distance - step * splitLength
      let rings = []
      // 根据点数组创建线的GeoJson结构
      let route = turf.lineString([from.geometry.coordinates, to.geometry.coordinates])
      for (let i = 1; i <= step; i++) {
        let nlength = i * splitLength
        // 沿line返回指定具体的point数据
        let pnt = turf.along(route, nlength, {
          units: 'kilometers'
        })
        rings.push(pnt.geometry.coordinates)
      }
      // 例如 5/2 为2 ,则将最后一个点设置为终点的经纬度信息
      if (leftLength > 0) {
        rings.push(to.geometry.coordinates)
      }
      return rings
    }
    if(turf) {
			let ring = splitLine(from, to)
			let that = this
			let j = 0
			if (that.timer1) {
				clearInterval(that.timer1)
			}
			that.timeouthandler = function(){
				setTimeout(function () {
					if (j >= ring.length - 1) {
						return
					}
					let lnglat = new LTMap.LngLat(ring[j][0], ring[j][1])

					that.setPosition(lnglat)
					j += 1
					that.timeouthandler()
				}, 0.5)
			}
			that.timeouthandler()
    }
	}

	/**
	 * @description 获取点标记缩放值
	 * @returns 点标记缩放值
	 */
	getScale() {
		const vm = this
		let scale = vm.image.getScale()
		return scale
	}

	/**
	 * @description 设置点标记缩放值
	 * @param {number}scale 缩放值，必填
	 */
	setScale(scale) {
		const vm = this
		vm.image.setScale(scale)
	}
  
	/**
	 * @description 获取点标记偏移量
	 * @returns {[x,y]} 点标记偏移数组[x,y]
	 */
	getOffset() {
		const vm = this
		let anchor = vm.image.anchor_
		let offset = []
		offset[0] = -(anchor[0]*width)
		offset[1] = -(anchor[1]*height)
		return offset
	}

	/**
	 * @description 设置点标记偏移量
	 * @param {Array} offset 点标记偏移数组[x,y]，必填
	 * X X轴方向偏移量(正向右，负向左)
	 * Y Y轴方向偏移量(正向下，负向上)
	 */
	setOffset(offset) {
		const vm = this
		let anchor = []
		anchor[0] = -(offset[0]/width)
		anchor[1] = -(offset[1]/height)
		vm.image.anchor_ = anchor
	}

	/**
	 * @description 获取点标记旋转弧度
	 * @returns 点标记旋转弧度
	 */
	getAngle() {
		const vm = this
		let angle = vm.image.getRotation()
		return angle
	}

	/**
	 * @description 设置点标记旋转弧度
	 * @param {number} rotation 旋转弧度，必填
	 */
	setAngle(rotation) {
		const vm = this
		vm.image.setRotation(rotation)
	}

	/**
	 * @description 获取点标记叠加顺序
	 * @returns 点标记叠加顺序
	 */
	getZIndex() {
		const vm = this
		let index = vm.style.getZIndex()
		return index
	}

	/**
	 * @description 设置点标记叠加顺序
	 * @param {number} index 叠加顺序，必填，index值较大的点标记显示在上方 ,值相同时后创建的点标记显示在上方
	 */
	setZIndex(index) {
		const vm = this
		vm.style.setZIndex(index)
	}

	/**
	 * @description 设置点标记置顶,当地图有多个marker时,当isTop为true时marker将显示在最上层;当isTop为false时取消置顶
	 * @param {boolean} isTop 必填，true:显示在最上层,false:取消置顶
	 */
	setTop(isTop) {
		const vm = this
		let markers = vm.source.getFeatures()
		let maxIndex = 0
		for(let i=0; i<markers.length; i++) {
			if(markers[i].getStyle().getZIndex() > maxIndex)
			maxIndex = markers[i].getStyle().getZIndex()
		}
		if(isTop == true) {
			vm.style.setZIndex(++maxIndex)
		}
		else if(isTop == false) {
			vm.style.setZIndex(0)
		}
	}

	/**
	 * @description 获取用户自定义属性
	 * @returns {number,String,JSON} 用户自定义属性(支持数字,字符串,json)
	 */
	getExtData() {
		const vm = this
		let extData = vm.marker.values_.properties
		return extData
	}

	/**
	 * @description 设置用户自定义属性
	 * @param {number/String/JSON} extData 用户自定义属性(支持数字,字符串,json)，必填
	 */
	setExtData(extData) {
		const vm = this
		extData = (extData)? extData : null
		if(extData != null) {
			vm.marker.values_.properties = extData
		}
	}

	/**
	 * @description 获取点标记地图对象
	 * @returns 地图对象
	 */
	getMap() {
		const vm = this
		return vm.mapInstance
	}

	/**
	 * @description 设置点标记地图对象，传入null时，移除点标记，
	 * 建议不使用此API，使用remove方法
	 * @param {LTMap.Map} map 传入null，移除点标记
	 */
	setMap(mapInstance){
		const vm = this
		mapInstance = (mapInstance)? mapInstance : null
		if(mapInstance == null) { //当map为null时,删除点标记
			if(vm.source.hasFeature(vm.marker)) {
				vm.source.removeFeature(vm.marker)
				if(vm.markerPopup){
					vm.map.removeOverlay(vm.markerPopup)
				}
				vm.hideContent()
			}
		}else{
			if(mapInstance != vm.mapInstance){
				vm.mapInstance = mapInstance

			}
		}
	}

	/**
	 * @description 注册点标记事件
	 * @param {String} eventName 鼠标事件
	 * "click":鼠标点击事件 "mousemove":鼠标悬停事件
	 * @param {function} callback 选中点标记时触发函数
	 */
	on(eventName,callback){
		const vm = this
		if(eventName == "dblclick"){
			vm.map.on(eventName,function(e){
				let feature = vm.map.forEachFeatureAtPixel(e.pixel,function(feature) { 
					return feature
				},{
					layerFilter:function(e){
						if(e.values_.name == "defaultMarkerLayer"){
							return true
						}else{
							return false
						}
					}
				})
				if(feature && feature == marker){
					callback(e)
				}
			})
		}else{
			vm.marker.on(eventName,function(e) {
				if(eventName == "mousemove"){
					if(vm.marker.ol_uid != vm.mapInstance.InfowindowmoveUID)
					{
						vm.mapInstance.InfowindowmoveUID = vm.marker.ol_uid
						callback(e)
					}
				}
				else
				{
					callback(e)
				}
			})
		}
	}

	/**
	 * @description 设置鼠标悬停时,点标记显示内容
	 * @param {title} title 鼠标悬停内容(支持div模块/字符串格式)，必填
	 * @param {number} offsetX X轴方向偏移量(正向右，负向左)，选填参数，默认为0
	 * @param {number} offsetY Y轴方向偏移量(正向下，负向上)，选填参数，默认为-25
	 */
	setTitle(title,offsetX,offsetY) {
		const vm = this
		title = (title != undefined)? title : ""
		let lnglat = vm.getPosition()
		vm.on("mousemove",function(){
			let content
			//if(title.indexOf("div")<0) { content = "<div class='olText'>"+title+"</div>" }
			if(title.indexOf("div")<0) { 
        content = "<div class='olText'><p class='olTextP' title='"+title+"'>"+title+"</p></div>" 
      }else { 
        content = title
      }
			let infoWindow = new LTMap.InfoWindow({
				content: content,
				position: lnglat,
				offsetX: offsetX,
				offsetY: offsetY,
				type: "mousemove"
			})
			infoWindow.open(false) //显示标题内容
		})
	}

	/**
   * @description 设置挂载Label
   * @param {DOM} content DOM元素
   * @param {number} offsetX DOM元素X偏移,向左为负，向右为正
   * @param {number} offsetY DOM元素X偏移,向上为负，向下为正
   * @memberof Marker
   */
  setLabel(content,offsetX,offsetY){
		const vm = this
		let contentParent = document.createElement('div')
		contentParent.insertAdjacentHTML('beforeend',content)
		let offset = [0,0]
		if(offsetX){
			offset[0] = offsetX
		}
		if(offsetY){
			offset[1] = offsetY
		}
		vm.markerPopup = new Overlay({
			element: contentParent,
			position: proj.fromLonLat([lng,lat]),
			offset: offset//图片偏移量
		})
		vm.map.addOverlay(vm.markerPopup)
	}

 	/**
  * @description 移除
  * @memberof Marker
  */
 	removeLabel(){
		const vm = this
		if(vm.markerPopup){
			vm.map.removeOverlay(vm.markerPopup)
		}
	}

	/**
	 * @description 隐藏挂载dom元素
	 */
	hideContent(){
		const vm = this
		if(vm.contentInfo.overlay && vm.contentInfo.show){
			vm.contentInfo.show = false
			vm.map.removeOverlay(vm.contentInfo.overlay)
		}
	}

	/**
	 * @description 显示挂载dom元素
	 */
	showContent(){
		const vm = this
		if(vm.contentInfo.overlay && !vm.contentInfo.show){
			vm.contentInfo.show = true
			vm.map.addOverlay(vm.contentInfo.overlay)
		}
	}

  /**
   * @description 设设置挂载的DOM,
   * @param {DOM} content 挂载到Map的DOM元素
   * @param {number} offsetX DOM元素在地图上X偏移,向左为负,向右为正
   * @param {number} offsetY DOM元素在地图上Y偏移,向上为负,向下为正
   * @memberof Marker
   */
	setContent(content,offsetX,offsetY){
		const vm = this
		let overlay = new Overlay({
			element: content,
      offset:[offsetX,offsetY]
		})
		vm.contentInfo.content = content
		vm.contentInfo.offsetX = offsetX
		vm.contentInfo.offsetY = offsetY
		vm.contentInfo.overlay = overlay
		vm.contentInfo.show = true
		vm.map.addOverlay(overlay)
		let coordinate = vm.lngLat
		overlay.setPosition(proj.fromLonLat(coordinate))
	}

  /**
   * @description 设置挂载的DOM可变长度的,
   * @param {DOM} content DOM 挂载到Map的DOM元素
   * @param {number} offsetY DOM元素在地图上Y偏移,向上为负,向下为正
   * @memberof Marker
   */
  setContentChangeAbleWidth(content,offsetY){
		const vm = this
		let overlay = new Overlay({
				element: content,
				positioning:"bottom-center",
				offset:[0,offsetY]
		})
		vm.contentInfo.content = content
		vm.contentInfo.offsetX = 0
		vm.contentInfo.offsetY = offsetY
		vm.contentInfo.overlay = overlay
		vm.contentInfo.show = true
		vm.map.addOverlay(overlay)
		let coordinate = vm.lngLat
		overlay.setPosition(proj.fromLonLat(coordinate))
  }
}
export default Marker