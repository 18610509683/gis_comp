
import KBaseObject from './KBaseObject'
import ImageStatic from 'ol/source/ImageStatic'
import Image from 'ol/layer/Image'
import Common from './Common'
import {transformExtent} from 'ol/proj/'
/**
 * @description KMap.StaticImageLayer 静态图层类
*/
class StaticImageLayer extends KBaseObject{
	/**
	 * @description 构造函数
	 * @param {String} url XYZ图层服务地址
	 * @param {KMap.Map} [mapInstance=null] map对象，单地图的时候可不传，多地图时候需要传
	 * @memberof StaticImageLayer
	 */
	constructor(url,options,mapInstance = null){
    	super(mapInstance)
		const vm = this
		vm.initLayer(url,options)
  	}
	/**
	 * @description 切片加载XYZ图层
	 * @param {*} url
	 * @param {*} layerName
	 * @memberof StaticImageLayer
	 */
	 initLayer(url,options){
		var minZoom = Common.BaseLayerZoom[0];
		var maxZoom = Common.BaseLayerZoom[1];
		if(options && options.minZoom != undefined){
			minZoom = options.minZoom
		}
		if(options && options.maxZoom != undefined){
			maxZoom = options.maxZoom
		}
		const extent = options.extent
		const vm = this
		const projection = vm.map.getView().getProjection().code_;
		const layer = new Image({
			source: new ImageStatic({
			  url: url,
			  projection: projection,
			  imageExtent: transformExtent(extent,'EPSG:4326',projection)
			}),
			maxZoom:maxZoom,
			minZoom:minZoom
		})
		vm.map.addLayer(layer)
	}

  	/**
	* @description 添加XYZ图层到地图
	* @memberof StaticImageLayer
	*/
    add(){
		const vm = this
		if(!vm.state) {
			vm.map.addLayer(vm.layer)
			vm.state = true
		}
	}

	/**
	 * @description 从当前地图中移除XYZ图层
	 * @memberof StaticImageLayer
	 */
	remove() {
		const vm = this
		if(vm.state) {
			vm.map.removeLayer(vm.layer)
			vm.state = false
		}
	}

	/**
	 * @description 显示XYZ图层数据
	 * @memberof StaticImageLayer
	 */
	show(){
		const vm = this
		if(vm.state) {
			vm.layer.setVisible(true)
		}
	}

	/**
	 * @description 隐藏XYZ图层数据
	 * @memberof StaticImageLayer
	 */
	hide(){
		const vm = this
		if(vm.state) {
			vm.layer.setVisible(false)
		}
	}

	/**
	 * @description 缩放到过滤后的地图要素对应范围
	 * @memberof StaticImageLayer
	 */
	zoomTo() {
    	const vm = this
	}
}
export default StaticImageLayer