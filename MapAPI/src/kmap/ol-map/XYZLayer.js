
import LTBaseObject from './KBaseObject'
import XYZ from 'ol/source/XYZ'
import Tile from 'ol/layer/Tile'
import Common from './Common'
/**
 * @description LTMap.XYZLayer XYZ图层类
*/
class XYZLayer extends LTBaseObject{
	/**
	 * @description 构造函数
	 * @param {String} url XYZ图层服务地址
	 * @param {LTMap.Map} [mapInstance=null] map对象，单地图的时候可不传，多地图时候需要传
	 * @memberof XYZLayer
	 */
	constructor(url,options,mapInstance = null){
    super(mapInstance)
		const vm = this
		vm.initXYZLayer(url,options)
  }
	/**
	 * @description 切片加载XYZ图层
	 * @param {*} url
	 * @param {*} layerName
	 * @memberof XYZLayer
	 */
	 initXYZLayer(url,options){
		var minZoom = Common.BaseLayerZoom[0];
		var maxZoom = Common.BaseLayerZoom[1];
		debugger;
		if(options && options.minZoom != undefined){
			minZoom = options.minZoom
		}
		if(options && options.maxZoom != undefined){
			maxZoom = options.maxZoom
		}
		const vm = this
		vm.source = new XYZ({
      url : url
    })

		vm.layer = new Tile({
			source:vm.source,
			maxZoom:maxZoom,
			minZoom:minZoom
		})

		vm.map.addLayer(vm.layer)
	}

  /**
	* @description 添加XYZ图层到地图
	* @memberof XYZLayer
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
	 * @memberof XYZLayer
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
	 * @memberof XYZLayer
	 */
	show(){
		const vm = this
		if(vm.state) {
			vm.layer.setVisible(true)
		}
	}

	/**
	 * @description 隐藏XYZ图层数据
	 * @memberof XYZLayer
	 */
	hide(){
		const vm = this
		if(vm.state) {
			vm.layer.setVisible(false)
		}
	}

	/**
	 * @description 缩放到过滤后的地图要素对应范围
	 * @memberof XYZLayer
	 */
	zoomTo() {
    const vm = this
	}
}
export default XYZLayer