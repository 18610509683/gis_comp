import Size from './Size'
import Pixel from './Pixel'
import LT2DMapConfig from '../config/LT2DMapConfig'
import LngLat from './LngLat'
import Bounds from './Bounds'
import { v4 as uuidv4 } from 'uuid'
import Check from './Check'
/**
 * @description KMap.Common类 通用静态方法
 */
class Common{
	/**
	 *@description 地图简图路径
	*/
	static SimpleMapDataUrl = LT2DMapConfig.SimpleMapDataUrl

	/**
	 *@description 高德离线地图路径
	*/
	static MapDataUrl = LT2DMapConfig.MapDataUrl

	/**
	 *@description 路况简图路径
	*/
	static TrafficMapDataUrl = LT2DMapConfig.TrafficMapDataUrl
	
	/**
	 *@description 在线地图路径
	*/
	static OnlineMapDataUrl = LT2DMapConfig.OnlineMapDataUrl

		/**
	 *@description 百度地图路径
	*/
	static BaiDuMapDataUrl = LT2DMapConfig.BaiDuMapDataUrl
	/**
	 *@description 地图缩放范围，包含最小、最大缩放级别的数组，默认为3-18级
	*/
	static ShowLevel =  LT2DMapConfig.ShowLevel
	
	/**
	 *@description 是否使用简图，默认为不使用
	*/
	static UseSimpleMap = LT2DMapConfig.UseSimpleMap
	
	/**
	 *@description 是否使用路况简图，默认为不使用
	*/
	static UseTrafficMap =  LT2DMapConfig.UseTrafficMap
	
	/**
	 *@description 是否使用在线地图，默认为不使用
	*/
	static UseOnlineMap = LT2DMapConfig.UseOnlineMap

	/**
	 *@description 是否使用在线地图，默认为不使用
	*/
	static UseBaiDuMap = LT2DMapConfig.UseBaiDuMap
	/**
	 *@description 是否显示地图操作工具条，默认为显示
	*/
	static ShowToolbarControl = LT2DMapConfig.ShowToolbarControl
	/**
	 * @description 利通地图像素转OpenLayers地图像素
	 * @param {KMap.Pixel} pixel KMap.Pixel格式的像素，必填
	 * @returns {Array} OpenLayers格式的像素，包含两个元素的数组[x,y]
	*/
	static KMapPixel2MapPixel(pixel){
		let mapPixel = [pixel.getX(),pixel.getY()]
		return mapPixel
	}

	/**
	 * @description OpenLayers地图像素转利通地图像素
	 * @param {Array} pixel OpenLayers格式的像素，包含两个元素的数组[x,y]，必填
	 * @returns {KMap.Pixel} KMap.Pixel格式的像素
	*/
	static MapPixel2KMapPixel(pixel) {
		let ltPixel = new Pixel(pixel[0], pixel[1])
		return ltPixel
	}

	/**
	 * @description 利通地图像素尺寸转OpenLayers地图像素尺寸
	 * @param {KMap.Size} size KMap.Size格式的尺寸，必填
	 * @returns {Array} OpenLayers地图像素尺寸，包含两个元素的数组[width,height]
	*/
	static KMapSize2MapSize(size) {
		let mapSize = [size.getWidth(), size.getHeight()]
		return mapSize
	}

	/**
	 * @description OpenLayers地图像素尺寸转利通地图像素尺寸
	 * @param {Array} size OpenLayers地图像素尺寸，包含两个元素的数组[width,height]，必填
	 * @returns {KMap.Size} 格式的尺寸
	*/
	static MapSize2KMapSize(size) {
		let ltSize = new Size(size[0], size[1])
		return ltSize
	}

	/**
	 * @description 利通地图经纬度转OpenLayers地图经纬度
	 * @param {KMap.LngLat} lnglat KMap.LngLat格式的经纬度，必填
	 * @returns {Array} OpenLayers的经纬度格式,包含两个元素的数组[lng,lat]
	*/
	static KMapLngLat2MapLngLat(lnglat) {
		let alnglat = [lnglat.getLng(),lnglat.getLat()]
		return alnglat
	}

	/**
	 * @description OpenLayers地图经纬度转利通地图经纬度
	 * @param {Array} lnglat OpenLayers的经纬度格式,包含两个元素的数组[lng,lat]，必填
	 * @returns {KMap.LngLat} KMap.LngLat格式的经纬度
	*/
	static MapLngLat2KMapLngLat(lnglat) {
		let ltlnglat = new LngLat(lnglat[0], lnglat[1])
		return ltlnglat
	}

	/**
	 * @description 利通地图经纬度矩形范围转OpenLayers地图经纬度矩形范围
	 * @param {KMap.Bounds} bounds KMap.Bounds对象，必填
	 * @returns {Array} 西南角经度、西南角纬度、东北角经度、东北角纬度构成的数组
	*/
	static KMapBounds2MapBounds(bounds) {
		let array = new Array()
		let southWest = bounds.getSouthWest()
		let northEast = bounds.getNorthEast()
		array.push(southWest.getLng())
		array.push(southWest.getLat())
		array.push(northEast.getLng())
		array.push(northEast.getLat())
		return array
	}

	/**
	 * @description OpenLayers地图经纬度矩形范围转利通地图经纬度范围
	 * @param {Array} bounds 西南角经度、西南角纬度、东北角经度、东北角纬度构成的数组，必填
	 * @returns {KMap.Bounds} KMap.Bounds类型对象
	*/
	static MapBounds2KMapBounds(bounds) {
		let southWest = [bounds[0],bounds[1]]
		let northEast = [bounds[2],bounds[3]]
		southWest = new LngLat(southWest[0],southWest[1])
		northEast = new LngLat(northEast[0],northEast[1])
		bounds = new Bounds(southWest,northEast)
		return bounds
	}

	/**
	 * @description Div居中显示，供外部函数调用
	 * @param {Object} obj div对象($('.className')或$('#idName'))
	*/
	static ShowDivInCenter(obj) {
		obj.show()
		Common.SetDivCenter(obj)
		$(window).scroll(function() {
			Common.SetDivCenter(obj)
		})
		$(window).resize(function() {
			Common.SetDivCenter(obj)
		})
	}

	/**
	 * @description Div居中显示，供内部函数使用
	 * @param {Object} obj div对象 ($('.className')或$('#idName'))
	*/
	static SetDivCenter(obj) {
		let windowWidth = document.documentElement.clientWidth
		let windowHeight = document.documentElement.clientHeight
		let divHeight = $(obj).height()
		let divWidth = $(obj).width()
		$(obj).css({
			"position" : "absolute",
			"top" : (windowHeight - divHeight) / 2 + $(document).scrollTop(),
			"left" : (windowWidth - divWidth) / 2
		});
	}

	/**
	 * @description 扩展JSON对象属性
	 * @param {JSON} des 目标JSON对象，必填
	 * @param {JSON} src 源JSON对象，必填
	 * @param {boolean} override 是否覆盖属性，选填
	 * @returns {JSON} 目标JSON对象
	*/
	static extend(des, src, override){
		if(src instanceof Array){
			for(let i = 0, len = src.length; i < len; i++)
				KMap.Common.extend(des, src[i], override)
		}
		for( let i in src){
			if(override || !(i in des)){
				des[i] = src[i]
			}
		}
		return des
	}
	static checkLngLat(lng,lat){
		let info = Check.lngLat(lng,lat)
    if(!info.isPass){
      throw new Error(info.msg)
    }
	}

	static notEmpty(name,str){
		let info = Check.notEmpty(name,str)
    if(!info.isPass){
      throw new Error(info.msg)
    }
	}

	/***
	 * 生成UUID
	 */
	static createUUID(){
		return uuidv4()
	}
}

export default Common