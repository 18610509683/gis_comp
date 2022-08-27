import Common from './Common'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import Style from 'ol/style/Style'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import Text from 'ol/style/Text'
import LTBaseObject from './LTBaseObject'
import * as proj from 'ol/proj'
/**
 * @description LTMap.Label 文本标记类
*/
class Label extends LTBaseObject{
	/**
	 * Creates an instance of Label.
	 * @param {*} param
	 * @param {LTMap.Map} [mapInstance=null] map对象，单地图的时候可不传，多地图时候需要传
	 * @memberof Label
	 */
	constructor(param,mapInstance = null){
		super(mapInstance)
		const vm = this
    let lng = (param.lng != undefined)? Number(param.lng) : vm.mapInstance.getCenter()[0]
    let lat = (param.lat != undefined)? Number(param.lat) : vm.mapInstance.getCenter()[1]
    let text = (param.text != undefined)? param.text : ""
    let font = (param.font != undefined)? param.font : '13px sans-serif'
    let offsetX = (param.offsetX != undefined)? param.offsetX : 0
    let offsetY = (param.offsetY != undefined)? param.offsetY : 0
    let rotation = (param.rotation != undefined)? param.rotation : 0
    let fill = (param.fill != undefined)? param.fill : "black"
    let backgroundColor = (param.backgroundColor != undefined)? param.backgroundColor : "#fff"
    let backgroundStroke = (param.backgroundStroke != undefined)? param.backgroundStroke : "black"
    let padding = (param.padding != undefined)? param.padding : [0,5,0,5]
    Common.checkLngLat(lng,lat)
		//创建文本标记
    vm.label = new Feature({
      geometry: new Point(proj.fromLonLat([lng,lat])),
      properties: null
    })
    vm.style = new Style({
      text: new Text({
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
      }),
      zIndex: 0
    })
    vm.label.setStyle(vm.style)
    vm.text = vm.style.getText() //文本标记内容
    vm.point = vm.label.getGeometry() //文本标记对象
    vm.source = vm.mapInstance.labelLayer.getSource() //地图文本标记图层
    //文本标记添加到地图
    vm.source.addFeature(vm.label)
  }

  /**
	 * 获取id
	 * @returns id
	*/
	getId() {
		const vm = this
		let id = vm.label.getId()
		return id
	}

	/**
	 * 设置id
	 * @param id 必填
	 */
	setId(id) {
		const vm = this
		vm.label.setId(id)
	}

	/**
	 * 显示文本标记
	 */
	show() {
		const vm = this
		if(!vm.source.hasFeature(label)) {
			vm.source.addFeature(label)
		}
	}

	/**
	 * 隐藏文本标记
	*/
	hide() {
		const vm = this
		if(vm.source.hasFeature(label)) {
			vm.source.removeFeature(label)
		}
	}

	/**
	 * 删除文本标记
	 */
	remove() {
		const vm = this
		if(vm.source.hasFeature(label)) {
			vm.source.removeFeature(label)
		}
	}

	/**
	 * 获取文本标记坐标
	 * @param 返回LTMap.LngLat格式的经纬度
	*/
	getPosition() {
		const vm = this
		let position = new proj.toLonLat(vm.point.getCoordinates())
		position = Common.MapLngLat2LTMapLngLat(position)
		return position
	}

	/**
	 * 设置文本标记坐标
	 * @param LTMap.LngLat格式的文本标记经纬度坐标，必填
	*/
	setPosition(lnglat){
		lnglat = Common.LTMapLngLat2MapLngLat(lnglat)
		let position = proj.fromLonLat(lnglat)
		point.setCoordinates(position)
	}

	/**
	 * 获取文本标记缩放值
	 * @returns 文本标记缩放值
	 */
	getScale(){
		const vm = this
		let scale = vm.text.getScale()
		return scale
	}

	/**
	 * 设置文本标记缩放值
	 * @param scale 缩放值，必填
	*/
	setScale(scale) {
		const vm = this
		vm.text.setScale(scale)
	}

	/**
	 * 获取文本标记X轴方向偏移量
	 * @returns X轴方向偏移量
	*/
	getOffsetX(){
		const vm = this
		let offsetX = vm.text.offsetX_
		return offsetX
	}

	/**
	 * 设置文本标记X轴方向偏移
	 * @param X轴方向偏移(正向右，负向左)，必填
	*/
	setOffsetX(offsetX) {
		const vm = this
		vm.text.offsetX_ = offsetX
	}

	/**
	 * 获取文本标记Y轴方向偏移量
	 * @returns Y轴方向偏移量
	*/
	getOffsetY() {
		const vm = this
		let offsetY = vm.text.offsetY_
		return offsetY
	}

	/**
	 * 设置文本标记Y轴方向偏移
	 * @param offsetY Y轴方向偏移(正向下，负向上)，必填
	*/
	setOffsetY(offsetY) {
		const vm = this
		vm.text.offsetY_ = offsetY
	}

	/**
	 * 获取文本标记旋转弧度
	 * @returns 文本标记旋转弧度
	*/
	getAngle(){
		const vm = this
		let rotation = vm.text.rotation_
		return rotation
	}

	/**
	 * 设置文本标记旋转弧度
	 * @param rotation 文本标记旋转弧度，必填
	*/
	setAngle(rotation){
		const vm = this
		vm.text.rotation_ = rotation
	}

	/**
	 * 获取文本标记叠加顺序
	 * @returns 文本标记叠加顺序
	*/
	getZIndex() {
		const vm = this
		let index = vm.style.getZIndex()
		return index
	}

	
  /**
	 * 设置文本标记叠加顺序
	 * @param index index值较大的点标记显示在上方 ,值相同时后创建的点标记显示在上方，必填
	*/
	setZIndex(index) {
		const vm = this
		vm.style.setZIndex(index)
	}
	
  /**
	 * 获取用户自定义属性
	 * @returns 用户自定义属性(支持数字,字符串,json)
	*/
	getExtData(){
		const vm = this
		let extData = vm.label.values_.properties
		return extData
	}
	
  /**
	 * 设置用户自定义属性
	 * @param extData 用户自定义属性(支持数字,字符串,json)，必填
	*/
	setExtData(extData){
		const vm = this
		extData = (extData)? extData :null
		if(extData != null) {
			vm.label.values_.properties = extData
		}
	}

	/**
	 * 注册文本标记事件
	 * @param eventName 鼠标事件
	 * "click":鼠标点击事件 "mousemove":鼠标悬停事件
	 * @param callback 选中文本标记时触发函数
	*/
	on(eventName,callback) {
    const vm = this
		vm.label.on(eventName,function(e) {
			if(eventName == "mousemove"){
				if(vm.label.ol_uid != vm.mapInstance.InfowindowmoveUID)
				{
					vm.mapInstance.InfowindowmoveUID = vm.label.ol_uid
					callback(e)
				}
			}
			else{
				callback(e)
			}
		})
	}
	
  /**
	 * 注销文本标记事件(暂无该方法)
	*/
	off(eventName,handler) {}
	
  /**
	 * 获取文本标记地图对象
	 * @returns 地图对象
	*/
	getMap() {
    const vm = this
		let map = vm.map
		return map
	}

	/**
	 * 设置文本标记地图对象，传入null时，移除点标记，
	 * 建议不使用此API，使用remove方法
	 * @param map 传入null，移除点标记
	*/
	setMap(map) {
    const vm = this
		map = (vm.map)? vm.map : null
		if(map == null) {
			if(vm.source.hasFeature(vm.abel)) {
				vm.source.removeFeature(vm.label)
			}
		}
	}
}
export default Label